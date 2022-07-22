using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplePostsFeed.Extensions;
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

        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthenticatedResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Register([FromBody] AccountViewModel registerModel)
        {
            if (registerModel is null)
            {
                return BadRequest("Invalid client request");
            }

            var result = await _appRepository.Register(registerModel);

            return result == null
                ? Unauthorized()
                : Ok(result);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthenticatedResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Login([FromBody] AccountViewModel loginModel)
        {
            if (loginModel is null)
            {
                return BadRequest("Invalid client request");
            }

            var result = await _appRepository.Register(loginModel);

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
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var userName = User.GetUserName();
            await _appRepository.Revoke(userName);

            return Ok();
        }
    }
}
