using SmartLocalBusiness.Shared.DTOs;

namespace SmartLocalBusiness.UserService.Services
{
    public interface IUserService
    {
        Task<UserDto> RegisterAsync(RegisterUserDto dto);
        Task<string> LoginAsync(LoginDto dto);
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<UserDto> UpdateUserAsync(int userId, UserDto dto);
    }
}
