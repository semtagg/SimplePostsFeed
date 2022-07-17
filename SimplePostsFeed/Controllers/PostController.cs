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

        //TODO: returns type should be postviewmodel
        [HttpGet]
        [ProducesResponseType(typeof(PostViewModelDto[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await _appRepository.GetAllPosts();

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PostViewModelDto[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPostByUserId(int id)
        {
            var result = await _appRepository.GetPostByUserId(id);

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostViewModel post)
        {
            var first = HttpContext.User.Claims;
            var second = Request;
            var third = Response;
            var third1 = ControllerContext;
            var tmp = new PostViewModelDto()
            {
                Title = post.Title,
                Body = post.Body,
                UserId = post.UserId
            };

            await _appRepository.CreatePost(tmp);

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
