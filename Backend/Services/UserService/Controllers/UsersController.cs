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
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            try
            {
                _logger.LogInformation("📝 Registration attempt for: {Email}", dto.Email);
                
                // Validate input
                if (string.IsNullOrWhiteSpace(dto.Email))
                    return BadRequest(new { success = false, message = "Email is required" });
                
                if (string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(new { success = false, message = "Password is required" });

                var result = await _userService.RegisterAsync(dto);
                
                _logger.LogInformation("✅ Registration successful for: {Email}", dto.Email);
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Registration failed for: {Email}", dto.Email);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                _logger.LogInformation("🔐 Login attempt for: {Email}", dto.Email);
                
                // Validate input
                if (string.IsNullOrWhiteSpace(dto.Email))
                    return BadRequest(new { success = false, message = "Email is required" });
                
                if (string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(new { success = false, message = "Password is required" });

                var token = await _userService.LoginAsync(dto);
                
                _logger.LogInformation("✅ Login successful for: {Email}", dto.Email);
                return Ok(new { success = true, data = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Login failed for: {Email}", dto.Email);
                
                // Don't expose internal errors to client for security
                if (ex.Message.Contains("Invalid"))
                    return Unauthorized(new { success = false, message = ex.Message });
                
                return StatusCode(500, new { success = false, message = "An error occurred during login" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                _logger.LogInformation("🔍 Fetching user: {UserId}", id);
                
                var user = await _userService.GetUserByIdAsync(id);
                
                _logger.LogInformation("✅ User found: {UserId}", id);
                return Ok(new { success = true, data = user });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to fetch user: {UserId}", id);
                
                if (ex.Message.Contains("not found"))
                    return NotFound(new { success = false, message = ex.Message });
                
                return StatusCode(500, new { success = false, message = "An error occurred" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDto dto)
        {
            try
            {
                _logger.LogInformation("📝 Updating user: {UserId}", id);
                
                var result = await _userService.UpdateUserAsync(id, dto);
                
                _logger.LogInformation("✅ User updated: {UserId}", id);
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to update user: {UserId}", id);
                
                if (ex.Message.Contains("not found"))
                    return NotFound(new { success = false, message = ex.Message });
                
                return StatusCode(500, new { success = false, message = "An error occurred" });
            }
        }
    }
}