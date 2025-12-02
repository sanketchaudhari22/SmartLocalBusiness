using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SearchService.Data;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Models;
using Microsoft.Extensions.Logging;

namespace SearchService.Services
{
    public class SearchService : ISearchService
    {
        private readonly SearchDbContext _context;
        private readonly ILogger<SearchService> _logger;

        public SearchService(SearchDbContext context, ILogger<SearchService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // ✅ Search Businesses (stored proc)
        public async Task<PagedResult<BusinessDto>> SearchBusinessesAsync(SearchRequest request)
        {
            try
            {
                _logger.LogInformation("🔍 Searching businesses with term: {Term}, City: {City}, Category: {CategoryId}",
                    request.SearchTerm, request.City, request.CategoryId);

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

                _logger.LogInformation("✅ Found {Count} businesses", totalCount);

                return new PagedResult<BusinessDto>
                {
                    Items = paged,
                    TotalCount = totalCount,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize
                };
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "❌ Database error during search");
                throw new Exception("Failed to search businesses due to database error", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error searching businesses");
                throw new Exception("Failed to search businesses", ex);
            }
        }

        // ✅ Nearby Businesses
        public async Task<List<BusinessDto>> GetNearbyBusinessesAsync(decimal latitude, decimal longitude, int radiusInKm, int? categoryId = null)
        {
            try
            {
                _logger.LogInformation("📍 Searching nearby businesses at ({Lat}, {Lng}) within {Radius}km",
                    latitude, longitude, radiusInKm);

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

                _logger.LogInformation("✅ Found {Count} nearby businesses", businesses.Count);

                return businesses.Select(b => new BusinessDto
                {
                    BusinessId = b.BusinessId,
                    BusinessName = b.BusinessName ?? string.Empty,
                    Description = b.Description ?? string.Empty,
                    Address = b.Address ?? string.Empty,
                    City = b.City ?? string.Empty,
                    State = b.State ?? string.Empty,
                    PhoneNumber = b.PhoneNumber ?? string.Empty,
                    Email = b.Email ?? string.Empty,
                    Rating = b.Rating,
                    TotalReviews = b.TotalReviews,
                    IsVerified = b.IsVerified,
                    CategoryName = b.CategoryName ?? string.Empty
                }).ToList();
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "❌ Database error during nearby search");
                throw new Exception("Failed to search nearby businesses due to database error", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error searching nearby businesses");
                throw new Exception("Failed to search nearby businesses", ex);
            }
        }

        // 🆕 Quick Search (Autocomplete) - NULL-SAFE
        public async Task<IEnumerable<BusinessDto>> QuickSearchAsync(string term, int limit = 5)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(term))
                {
                    _logger.LogWarning("⚠️ Quick search called with empty term");
                    return new List<BusinessDto>();
                }

                _logger.LogInformation("⚡ Quick search for: {Term}", term);

                var results = await _context.Set<BusinessDto>()
                    .Where(b => (b.BusinessName != null && b.BusinessName.Contains(term)) ||
                               (b.Description != null && b.Description.Contains(term)))
                    .Take(limit)
                    .ToListAsync();

                _logger.LogInformation("✅ Quick search found {Count} results", results.Count);

                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error in quick search");
                // Return empty list instead of throwing, to prevent autocomplete from breaking
                return new List<BusinessDto>();
            }
        }
    }
}
