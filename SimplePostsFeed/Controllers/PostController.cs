using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;
using SimplePostsFeed.Repository;

namespace SimplePostsFeed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IAppRepository _appRepository;

        public PostController(IAppRepository appRepository)
        {
            _appRepository = appRepository;
        }

        [HttpGet]
        public async Task<PostViewModelDto[]> GetAllPosts()
        {
            return await _appRepository.GetAllPosts();
        }
        
        [HttpGet("{id}")]
        public async Task<PostViewModelDto[]> GetPostByUserId(int id)
        {
            return await _appRepository.GetPostByUserId(id);
        }
        
        [HttpPost]
        public async Task CreatePost(PostViewModelDto post)
        {
            await _appRepository.CreatePost(post);
        }
        
        [HttpDelete]
        
    }
}
