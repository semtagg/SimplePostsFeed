using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;
using SimplePostsFeed.Repository;
using SimplePostsFeed.Services;

namespace SimplePostsFeed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAppRepository _appRepository;

        public AuthController(IAppRepository appRepository)
        {
            _appRepository = appRepository ?? throw new ArgumentNullException(nameof(appRepository));
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthenticatedResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Login([FromBody] AccountViewModelDto loginModel)
        {
            if (loginModel is null)
            {
                return BadRequest("Invalid client request");
            }

            var result = await _appRepository.Login(loginModel);

            return result == null
                ? Unauthorized()
                : Ok(result);
        }

        [HttpPost]
        [Route("refresh")]
        [ProducesResponseType(typeof(AuthenticatedResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Refresh(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid client request");

            var result = await _appRepository.Refresh(tokenApiModel);

            return result == null
                ? Unauthorized()
                : Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var userName = User.Identity.Name;
            
            await _appRepository.Revoke(userName);
            
            return Ok();
        }
    }
}
