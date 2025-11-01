using SmartLocalBusiness.Domain.Entities;

namespace SmartLocalBusiness.UserService.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
