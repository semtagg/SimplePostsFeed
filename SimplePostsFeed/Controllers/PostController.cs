﻿using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimplePostsFeed.Extensions;
using SimplePostsFeed.Models;
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

        [HttpGet("getPostById/{id}")]
        [ProducesResponseType(typeof(PostViewModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPostById(int id)
        {
            var token = Request.GetToken();
            var result = await _appRepository.GetPostById(id, token);

            return result == null
                ? NotFound()
                : Ok(result);
        }

        [HttpPost("createPosts")]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostViewModel post)
        {
            var token = Request.GetToken();
            await _appRepository.CreatePost(post, token);

            return Ok();
        }

        [HttpDelete("removePost/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var token = Request.GetToken();
            await _appRepository.DeletePost(id, token);

            return Ok();
        }

        [HttpPost("updatePost")]
        public async Task<IActionResult> UpdatePost(UpdateViewModel post)
        {
            var token = Request.GetToken();
            await _appRepository.UpdatePost(post, token);

            return Ok();
        }
    }
}
