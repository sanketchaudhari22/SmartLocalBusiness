using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Domain.Entities;

namespace BusinessService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ServicesController> _logger;

        public ServicesController(ApplicationDbContext context, ILogger<ServicesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/services/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound(ApiResponse<ServiceDto>.ErrorResponse("Service not found"));

            var dto = new ServiceDto
            {
                ServiceId = service.ServiceId,
                BusinessId = service.BusinessId,
                ServiceName = service.ServiceName,
                Description = service.Description,
                Price = service.Price
            };

            return Ok(ApiResponse<ServiceDto>.SuccessResponse(dto));
        }

        // GET: api/services/business/{businessId}
        [HttpGet("business/{businessId}")]
        public async Task<IActionResult> GetServicesByBusiness(int businessId)
        {
            var services = await _context.Services
                .Where(s => s.BusinessId == businessId)
                .Select(s => new ServiceDto
                {
                    ServiceId = s.ServiceId,
                    BusinessId = s.BusinessId,
                    ServiceName = s.ServiceName,
                    Description = s.Description,
                    Price = s.Price
                })
                .ToListAsync();

            return Ok(ApiResponse<List<ServiceDto>>.SuccessResponse(services));
        }

        // POST: api/services
        [HttpPost]
        public async Task<IActionResult> CreateService([FromBody] CreateServiceDto dto)
        {
            _logger.LogInformation("Creating service: {ServiceName} for business {BusinessId}", dto.ServiceName, dto.BusinessId);

            // Verify business exists
            var business = await _context.Businesses.FindAsync(dto.BusinessId);
            if (business == null)
                return NotFound(ApiResponse<ServiceDto>.ErrorResponse("Business not found"));

            var service = new Service
            {
                BusinessId = dto.BusinessId,
                ServiceName = dto.ServiceName,
                Description = dto.Description,
                Price = dto.Price
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            var result = new ServiceDto
            {
                ServiceId = service.ServiceId,
                BusinessId = service.BusinessId,
                ServiceName = service.ServiceName,
                Description = service.Description,
                Price = service.Price
            };

            _logger.LogInformation("Service created successfully: {ServiceId}", service.ServiceId);
            return Ok(ApiResponse<ServiceDto>.SuccessResponse(result, "Service created successfully"));
        }

        // PUT: api/services/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] UpdateServiceDto dto)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound(ApiResponse<ServiceDto>.ErrorResponse("Service not found"));

            if (!string.IsNullOrWhiteSpace(dto.ServiceName))
                service.ServiceName = dto.ServiceName;

            if (dto.Description != null)
                service.Description = dto.Description;

            if (dto.Price.HasValue)
                service.Price = dto.Price.Value;

            await _context.SaveChangesAsync();

            var result = new ServiceDto
            {
                ServiceId = service.ServiceId,
                BusinessId = service.BusinessId,
                ServiceName = service.ServiceName,
                Description = service.Description,
                Price = service.Price
            };

            _logger.LogInformation("Service updated: {ServiceId}", id);
            return Ok(ApiResponse<ServiceDto>.SuccessResponse(result, "Service updated successfully"));
        }

        // DELETE: api/services/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound(ApiResponse<bool>.ErrorResponse("Service not found"));

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Service deleted: {ServiceId}", id);
            return Ok(ApiResponse<bool>.SuccessResponse(true, "Service deleted successfully"));
        }
    }
}
