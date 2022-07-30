using System;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;
using SimplePostsFeed.Services;

namespace SimplePostsFeed.Repository
{
    public class AppRepository : IAppRepository
    {
        private readonly AppContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AppRepository(AppContext context, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<AuthenticatedResponse> Register(AccountViewModel registerModel)
        {
            if (await _context.Accounts.AnyAsync(x => x.UserName == registerModel.UserName))
                return null;

            var bytes = ASCIIEncoding.ASCII.GetBytes(registerModel.Password);
            var user = new AccountViewModelDto()
            {
                UserName = registerModel.UserName,
                PasswordHash = new MD5CryptoServiceProvider().ComputeHash(bytes),
            };

            await _context.Accounts.AddAsync(user);
            await _context.SaveChangesAsync();

            return await Login(registerModel);
        }

        public async Task<AuthenticatedResponse> Login(AccountViewModel loginModel)
        {
            var user = await _context.Accounts.FirstOrDefaultAsync(u =>
                (u.UserName == loginModel.UserName) && (u.PasswordHash.SequenceEqual(new MD5CryptoServiceProvider()
                    .ComputeHash(ASCIIEncoding.ASCII.GetBytes(loginModel.Password)))));

            if (user is null)
                return null;

            var claims = new List<Claim>
            {
                new Claim("_id", user.Id.ToString()),
                new Claim("_userName", loginModel.UserName)
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _context.SaveChangesAsync();

            return new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthenticatedResponse> Refresh(TokenApiModel tokenApiModel)
        {
            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name; //this is mapped to the Name claim by default
            var user = await _context.Accounts
                .SingleOrDefaultAsync(u => u.UserName == username);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return null;

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();

            return new AuthenticatedResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task Revoke(string userName)
        {
            var user = await _context.Accounts
                .SingleOrDefaultAsync(u => u.UserName == userName);
            user.RefreshToken = null;

            await _context.SaveChangesAsync();
        }

        public async Task<PostViewModel[]> GetAllPosts()
        {
            var users = await _context.Accounts.ToArrayAsync();
            var data = await _context.Posts.ToArrayAsync();

            return data.Select(d => new PostViewModel()
            {
                Id = d.Id,
                Title = d.Title,
                Body = d.Body,
                NickName = users.FirstOrDefault(u => u.Id == d.UserId)?.UserName
            }).ToArray();
        }

        public async Task<PostViewModel[]> GetPostByUserId(string token)
        {
            var userId = int.Parse(GetUserIdFromToken(token));
            var user = await _context.Accounts
                .FirstOrDefaultAsync(a => a.Id == userId);

            var data = await _context.Posts
                .Where(p => p.UserId == userId)
                .ToArrayAsync();

            return data.Select(d => new PostViewModel()
            {
                Id = d.Id,
                Title = d.Title,
                Body = d.Body,
                NickName = user.UserName
            }).ToArray();
        }

        public async Task<PostViewModel> GetPostById(int id, string token)
        {
            // TODO: validate token
            var post = await _context.Posts.FirstOrDefaultAsync(p=>p.Id == id);

            return _mapper.Map<PostViewModel>(post);
        }

        public async Task CreatePost(CreatePostViewModel post, string token)
        {
            var userId = int.Parse(GetUserIdFromToken(token));
            var postDto = _mapper.Map<PostViewModelDto>(post);
            postDto.UserId = userId;
            await _context.Posts.AddAsync(postDto);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePost(UpdateViewModel post, string token)
        {
            var userId = int.Parse(GetUserIdFromToken(token));
            var data = new PostViewModelDto()
            {
                Id = post.Id,
                Title = post.Title,
                Body = post.Body,
                UserId = userId
            };
            
            _context.Posts.Update(data);
            await _context.SaveChangesAsync();
        }

        public async Task<PostViewModel> DeletePost(int id, string token)
        {
            var item = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
            var userId = int.Parse(GetUserIdFromToken(token));
            
            if (item != null && item.UserId == userId)
            {
                _context.Posts.Remove(item);
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<PostViewModel>(item);
        }

        private string GetUserIdFromToken(string token)
            => _tokenService.GetPrincipalFromExpiredToken(token[7..]).Claims.ToArray()[0].Value;
    }
}
