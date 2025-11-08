using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SmartLocalBusiness.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartLocalBusiness.UserService.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            // ✅ FIX: Use JwtSettings instead of Jwt to match appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                // ✅ FIX: Use standard .NET claim name - this becomes "nameid" in JWT
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                
                // Keep custom claim as backup
                new Claim("userId", user.UserId.ToString()),
                
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim()),
                new Claim(ClaimTypes.Role, user.UserType ?? "Customer"),
                
                // Add these for better frontend compatibility
                new Claim("given_name", user.FirstName ?? ""),
                new Claim("family_name", user.LastName ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(int.Parse(_config["JwtSettings:ExpirationInDays"] ?? "7")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}