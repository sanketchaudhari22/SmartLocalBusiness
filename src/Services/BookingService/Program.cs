using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.BookingService.Interfaces;
using SmartLocalBusiness.BookingService.Services;

var builder = WebApplication.CreateBuilder(args);

// -------------------- CONTROLLERS --------------------
builder.Services.AddControllers();

// -------------------- DATABASE --------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// -------------------- DEPENDENCY INJECTION --------------------
builder.Services.AddScoped<IBookingService, BookingService>();

// -------------------- ✅ CORS CONFIG --------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",  // React frontend
                "http://localhost:5005"   // API Gateway
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// -------------------- SWAGGER --------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Booking Service API",
        Version = "v1",
        Description = "Handles booking creation, updates, and history"
    });
});

// -------------------- BUILD APP --------------------
var app = builder.Build();

// -------------------- SWAGGER UI --------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Booking Service API v1");
        c.RoutePrefix = "swagger";
    });
}

// -------------------- PIPELINE --------------------

// ❌ Remove HTTPS redirection for local dev (React call issue avoid)
 // app.UseHttpsRedirection();

// ✅ Enable CORS globally
app.UseCors("AllowFrontend");

// ✅ Auth (if required later)
app.UseAuthorization();

// ✅ Map Controllers
app.MapControllers();

// ✅ Run the Application
app.Run();
