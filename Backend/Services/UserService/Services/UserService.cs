using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using BCrypt.Net;

namespace SmartLocalBusiness.UserService.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly ILogger<UserService> _logger;

        public UserService(
            ApplicationDbContext context, 
            IJwtService jwtService,
            ILogger<UserService> logger)
        {
            _context = context;
            _jwtService = jwtService;
            _logger = logger;
        }

        public async Task<string> LoginAsync(LoginDto dto)
        {
            try
            {
                _logger.LogInformation("🔍 Looking up user by email: {Email}", dto.Email);
                
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == dto.Email);

                if (user == null)
                {
                    _logger.LogWarning("❌ User not found: {Email}", dto.Email);
                    throw new Exception("Invalid email or password.");
                }

                // Verify password using BCrypt
                if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                {
                    _logger.LogWarning("❌ Invalid password for user: {Email}", dto.Email);
                    throw new Exception("Invalid email or password.");
                }

                _logger.LogInformation("✅ User authenticated, generating token: {Email}", dto.Email);
                var token = _jwtService.GenerateToken(user);
                
                return token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Login error for: {Email}", dto.Email);
                throw;
            }
        }

        public async Task<UserDto> RegisterAsync(RegisterUserDto dto)
        {
            try
            {
                _logger.LogInformation("🔍 Checking if user exists: {Email}", dto.Email);
                
                var existing = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == dto.Email);
                
                if (existing != null)
                {
                    _logger.LogWarning("❌ User already exists: {Email}", dto.Email);
                    throw new Exception("User with this email already exists.");
                }

                // Hash password using BCrypt
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                var user = new User
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    PasswordHash = passwordHash, // ✅ Now properly hashed with BCrypt
                    PhoneNumber = dto.PhoneNumber,
                    UserType = dto.UserType ?? "Customer",
                    CreatedAt = DateTime.UtcNow
                };

                _logger.LogInformation("➕ Adding new user to database: {Email}", dto.Email);
                _context.Users.Add(user);
                
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("✅ User registered successfully: {Email}, UserId: {UserId}", 
                    dto.Email, user.UserId);

                return new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    UserType = user.UserType
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Registration error for: {Email}", dto.Email);
                throw;
            }
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation("🔍 Fetching user by ID: {UserId}", id);
                
                var user = await _context.Users.FindAsync(id);
                
                if (user == null)
                {
                    _logger.LogWarning("❌ User not found: {UserId}", id);
                    throw new Exception("User not found.");
                }

                _logger.LogInformation("✅ User found: {UserId}", id);
                
                return new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    UserType = user.UserType
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error fetching user: {UserId}", id);
                throw;
            }
        }

        public async Task<UserDto> UpdateUserAsync(int id, UserDto dto)
        {
            try
            {
                _logger.LogInformation("🔍 Updating user: {UserId}", id);
                
                var user = await _context.Users.FindAsync(id);
                
                if (user == null)
                {
                    _logger.LogWarning("❌ User not found: {UserId}", id);
                    throw new Exception("User not found.");
                }

                user.FirstName = dto.FirstName;
                user.LastName = dto.LastName;
                user.PhoneNumber = dto.PhoneNumber;
                user.UserType = dto.UserType;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("✅ User updated: {UserId}", id);

                return dto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error updating user: {UserId}", id);
                throw;
            }
        }
    }
}