using SmartLocalBusiness.Shared.DTOs;

namespace BusinessService.Services
{
    public interface IBusinessService
    {
        Task<BusinessDto> CreateBusinessAsync(CreateBusinessDto dto);
        Task<BusinessDto> GetBusinessByIdAsync(int businessId);
        Task<List<BusinessDto>> GetAllBusinessesAsync();
        Task<BusinessDto> UpdateBusinessAsync(int businessId, CreateBusinessDto dto);
        Task<bool> DeleteBusinessAsync(int businessId);
        Task<List<BusinessDto>> GetBusinessesByCategoryAsync(int categoryId);
        Task<List<BusinessDto>> GetBusinessesByUserAsync(int userId);

    }
}