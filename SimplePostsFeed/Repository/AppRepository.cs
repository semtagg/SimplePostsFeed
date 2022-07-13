using System;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
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

        public AppRepository(AppContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
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
                RefreshToken = registerModel.RefreshToken,
                RefreshTokenExpiryTime = registerModel.RefreshTokenExpiryTime
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
                new Claim(ClaimTypes.Name, loginModel.UserName),
                new Claim(ClaimTypes.Role, "Manager")
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
            var user = await _context.Accounts.SingleOrDefaultAsync(u => u.UserName == username);

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
            var user = await _context.Accounts.SingleOrDefaultAsync(u => u.UserName == userName);
            user.RefreshToken = null;
            await _context.SaveChangesAsync();
        }

        public async Task<PostViewModelDto[]> GetAllPosts()
        {
            return await _context.Posts.ToArrayAsync();
        }

        public async Task<PostViewModelDto[]> GetPostByUserId(int userId)
        {
            return await _context.Posts
                .Where(p => p.UserId == userId)
                .ToArrayAsync();
        }

        public async Task CreatePost(PostViewModelDto item)
        {
            await _context.Posts.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public Task UpdatePost(PostViewModelDto item)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PostViewModelDto> DeletePost(int id)
        {
            var item = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);

            if (item != null)
            {
                _context.Posts.Remove(item);
                await _context.SaveChangesAsync();
            }

            return item;
        }
    }
}
