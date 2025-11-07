using Microsoft.AspNetCore.Mvc;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.UserService.Services;

namespace SmartLocalBusiness.UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            return Ok(new { success = true, data = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _userService.LoginAsync(dto);
            return Ok(new { success = true, data = token });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDto dto)
        {
            var result = await _userService.UpdateUserAsync(id, dto);
            return Ok(result);
        }
    }
}
