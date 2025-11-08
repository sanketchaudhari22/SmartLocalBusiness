using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Infrastructure.Services;
using SmartLocalBusiness.Shared.DTOs;

namespace BusinessService.Services
{
    public class BusinessService : IBusinessService
    {
        private readonly ApplicationDbContext _context;
        private readonly ICacheService _cacheService;

        public BusinessService(ApplicationDbContext context, ICacheService cacheService)
        {
            _context = context;
            _cacheService = cacheService;
        }

        public async Task<BusinessDto> CreateBusinessAsync(CreateBusinessDto dto)
        {
            var business = new Business
            {
                UserId = dto.UserId,
                CategoryId = dto.CategoryId,
                BusinessName = dto.BusinessName,
                Description = dto.Description,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                ZipCode = dto.ZipCode,
                Latitude = dto.Latitude ?? 0,
                Longitude = dto.Longitude ?? 0,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                Website = dto.Website,
                Rating = 0,
                TotalReviews = 0,
                IsVerified = false,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();

            return await GetBusinessByIdAsync(business.BusinessId);
        }

        public async Task<BusinessDto> GetBusinessByIdAsync(int businessId)
        {
            var cacheKey = $"business_{businessId}";
            var cached = await _cacheService.GetAsync<BusinessDto>(cacheKey);
            if (cached != null) return cached;

            var business = await _context.Businesses
                .Include(b => b.Category)
                .FirstOrDefaultAsync(b => b.BusinessId == businessId);

            if (business == null)
                throw new Exception("Business not found");

            var dto = MapToDto(business);
            await _cacheService.SetAsync(cacheKey, dto, TimeSpan.FromMinutes(30));
            return dto;
        }

        // ✅ FIXED bool? => bool comparison
        public async Task<List<BusinessDto>> GetAllBusinessesAsync()
        {
            var businesses = await _context.Businesses
                .Include(b => b.Category)
                .Where(b => b.IsActive == true)  // ✅ cast fixed
                .ToListAsync();

            return businesses.Select(MapToDto).ToList();
        }

        public async Task<BusinessDto> UpdateBusinessAsync(int businessId, CreateBusinessDto dto)
        {
            var business = await _context.Businesses.FindAsync(businessId)
                ?? throw new Exception("Business not found");

            business.BusinessName = dto.BusinessName;
            business.Description = dto.Description;
            business.Address = dto.Address;
            business.City = dto.City;
            business.State = dto.State;
            business.ZipCode = dto.ZipCode;
            business.Latitude = dto.Latitude ?? 0;
            business.Longitude = dto.Longitude ?? 0;
            business.PhoneNumber = dto.PhoneNumber;
            business.Email = dto.Email;
            business.Website = dto.Website;
            business.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            await _cacheService.RemoveAsync($"business_{businessId}");

            return await GetBusinessByIdAsync(businessId);
        }

        public async Task<bool> DeleteBusinessAsync(int businessId)
        {
            var business = await _context.Businesses.FindAsync(businessId);
            if (business == null) return false;

            business.IsActive = false;
            await _context.SaveChangesAsync();
            await _cacheService.RemoveAsync($"business_{businessId}");
            return true;
        }

        // ✅ FIXED bool? in where condition
        public async Task<List<BusinessDto>> GetBusinessesByCategoryAsync(int categoryId)
        {
            var businesses = await _context.Businesses
                .Include(b => b.Category)
                .Where(b => b.CategoryId == categoryId && b.IsActive == true)  // ✅ fixed
                .ToListAsync();

            return businesses.Select(MapToDto).ToList();
        }

        // 🆕 Businesses by User (Dashboard)
        public async Task<List<BusinessDto>> GetBusinessesByUserAsync(int userId)
        {
            var businesses = await _context.Businesses
                .Include(b => b.Category)
                .Where(b => b.UserId == userId && b.IsActive == true)  // ✅ fixed
                .ToListAsync();

            return businesses.Select(MapToDto).ToList();
        }

        private static BusinessDto MapToDto(Business business)
        {
            return new BusinessDto
            {
                BusinessId = business.BusinessId,
                UserId = business.UserId ?? 0,
                CategoryId = business.CategoryId ?? 0,
                BusinessName = business.BusinessName ?? string.Empty,
                Description = business.Description ?? string.Empty,
                Address = business.Address ?? string.Empty,
                City = business.City ?? string.Empty,
                State = business.State ?? string.Empty,
                ZipCode = business.ZipCode ?? string.Empty,
                Latitude = business.Latitude ?? 0,
                Longitude = business.Longitude ?? 0,
                PhoneNumber = business.PhoneNumber ?? string.Empty,
                Email = business.Email ?? string.Empty,
                Website = business.Website ?? string.Empty,
                Rating = business.Rating ?? 0,
                TotalReviews = business.TotalReviews ?? 0,
                IsVerified = business.IsVerified ?? false,
                IsActive = business.IsActive ?? true,
                CreatedAt = business.CreatedAt ?? DateTime.UtcNow,
                UpdatedAt = business.UpdatedAt ?? DateTime.UtcNow,
                CategoryName = business.Category?.CategoryName ?? string.Empty
            };
        }
    }
}
