using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
            _appRepository = appRepository ?? throw new ArgumentNullException(nameof(appRepository));
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(PostViewModel[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await _appRepository.GetAllPosts();

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PostViewModel[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPostByUserId(int id)
        {
            var result = await _appRepository.GetPostByUserId(id);

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostViewModel post)
        {
            var token = Request.Headers["Authorization"].ToString();
            await _appRepository.CreatePost(post, token);

            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(PostViewModelDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _appRepository.DeletePost(id);

            return result == null
                ? NotFound()
                : Ok(result);
        }
    }
}
