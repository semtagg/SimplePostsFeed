using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimplePostsFeed.Extensions;
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

        [HttpGet("getAllPosts")]
        [ProducesResponseType(typeof(PostViewModel[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await _appRepository.GetAllPosts();

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpGet("getCurrentUserPosts")]
        [ProducesResponseType(typeof(PostViewModel[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPostByUserId()
        {
            var token = Request.GetToken();
            var result = await _appRepository.GetPostByUserId(token);

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpPost("createPosts")]
        public async Task<IActionResult> CreatePost([FromBody] PostViewModel post)
        {
            var token = Request.GetToken();
            await _appRepository.CreatePost(post, token);

            return Ok();
        }

        [HttpDelete("removePost/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            await _appRepository.DeletePost(id);

            return Ok();
        }
    }
}
