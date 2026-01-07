using Microsoft.AspNetCore.Mvc;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;
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
                    return BadRequest(ApiResponse<object>.ErrorResponse("Email is required"));

                if (string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(ApiResponse<object>.ErrorResponse("Password is required"));

                var result = await _userService.RegisterAsync(dto);

                _logger.LogInformation("✅ Registration successful for: {Email}", dto.Email);
                return Ok(ApiResponse<UserDto>.SuccessResponse(result, "Registration successful"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Registration failed for: {Email}", dto.Email);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
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
                    return BadRequest(ApiResponse<object>.ErrorResponse("Email is required"));

                if (string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(ApiResponse<object>.ErrorResponse("Password is required"));

                var loginResult = await _userService.LoginAsync(dto);

                _logger.LogInformation("✅ Login successful for: {Email}", dto.Email);
                return Ok(ApiResponse<object>.SuccessResponse(loginResult, "Login successful"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Login failed for: {Email}", dto.Email);

                // Don't expose internal errors to client for security
                if (ex.Message.Contains("Invalid"))
                    return Unauthorized(ApiResponse<object>.ErrorResponse(ex.Message));

                return StatusCode(500, ApiResponse<object>.ErrorResponse("An error occurred during login"));
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
                return Ok(ApiResponse<UserDto>.SuccessResponse(user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to fetch user: {UserId}", id);

                if (ex.Message.Contains("not found"))
                    return NotFound(ApiResponse<object>.ErrorResponse(ex.Message));

                return StatusCode(500, ApiResponse<object>.ErrorResponse("An error occurred"));
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
                return Ok(ApiResponse<UserDto>.SuccessResponse(result, "User updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to update user: {UserId}", id);

                if (ex.Message.Contains("not found"))
                    return NotFound(ApiResponse<object>.ErrorResponse(ex.Message));

                return StatusCode(500, ApiResponse<object>.ErrorResponse("An error occurred"));
            }
        }
    }
}