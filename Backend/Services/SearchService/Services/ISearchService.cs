using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Models;

namespace SearchService.Services
{
    public interface ISearchService
    {
        Task<PagedResult<BusinessDto>> SearchBusinessesAsync(SearchRequest request);
        Task<IEnumerable<BusinessDto>> QuickSearchAsync(string term, int limit = 5);

        Task<List<BusinessDto>> GetNearbyBusinessesAsync(decimal latitude, decimal longitude, int radiusInKm, int? categoryId = null);
    }
}