using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SearchService.Data;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Models;

namespace SearchService.Services
{
    public class SearchService : ISearchService
    {
        private readonly SearchDbContext _context;
        public SearchService(SearchDbContext context)
        {
            _context = context;
        }

        // ✅ Search Businesses (stored proc)
        public async Task<PagedResult<BusinessDto>> SearchBusinessesAsync(SearchRequest request)
        {
            var parameters = new[]
            {
                new SqlParameter("@SearchTerm", request.SearchTerm ?? (object)DBNull.Value),
                new SqlParameter("@City", request.City ?? (object)DBNull.Value),
                new SqlParameter("@CategoryId", request.CategoryId ?? (object)DBNull.Value)
            };

            var businesses = await _context.Set<BusinessDto>()
                .FromSqlRaw("EXEC sp_SearchBusinesses @SearchTerm, @City, @CategoryId", parameters)
                .ToListAsync();

            var totalCount = businesses.Count;
            var paged = businesses.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize).ToList();

            return new PagedResult<BusinessDto>
            {
                Items = paged,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }

        // ✅ Nearby Businesses
        public async Task<List<BusinessDto>> GetNearbyBusinessesAsync(decimal latitude, decimal longitude, int radiusInKm, int? categoryId = null)
        {
            var parameters = new[]
            {
                new SqlParameter("@Latitude", latitude),
                new SqlParameter("@Longitude", longitude),
                new SqlParameter("@RadiusInKm", radiusInKm),
                new SqlParameter("@CategoryId", categoryId ?? (object)DBNull.Value)
            };

            var businesses = await _context.Set<NearbyBusinessDto>()
                .FromSqlRaw("EXEC sp_GetNearbyBusinesses @Latitude, @Longitude, @RadiusInKm, @CategoryId", parameters)
                .ToListAsync();

            return businesses.Select(b => new BusinessDto
            {
                BusinessId = b.BusinessId,
                BusinessName = b.BusinessName,
                Description = b.Description,
                Address = b.Address,
                City = b.City,
                State = b.State,
                PhoneNumber = b.PhoneNumber,
                Email = b.Email,
                Rating = b.Rating,
                TotalReviews = b.TotalReviews,
                IsVerified = b.IsVerified,
                CategoryName = b.CategoryName
            }).ToList();
        }

        // 🆕 Quick Search (Autocomplete)
        public async Task<IEnumerable<BusinessDto>> QuickSearchAsync(string term, int limit = 5)
        {
            return await _context.Set<BusinessDto>()
                .Where(b => b.BusinessName.Contains(term) || b.Description.Contains(term))
                .Take(limit)
                .ToListAsync();
        }
    }
}
