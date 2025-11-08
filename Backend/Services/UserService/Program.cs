using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.UserService.Services;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure Kestrel to run on port 5000 (NOT 5005!)
builder.WebHost.UseUrls("http://localhost:5000");

// ✅ Add Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ✅ Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Register Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();

// ✅ CORS - Allow frontend to call backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ✅ Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "User Service API",
        Version = "v1",
        Description = "Handles user registration, login, and profile management"
    });
});

var app = builder.Build();

// ✅ Apply CORS
app.UseCors("AllowFrontend");

// ✅ Enable Swagger in all environments for testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "User Service API v1");
    c.RoutePrefix = "swagger";
});

// ✅ Log startup info
var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("🚀 User Service starting on http://localhost:5000");
logger.LogInformation("📚 Swagger UI available at http://localhost:5000/swagger");

// ✅ Test database connection
try
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var canConnect = await dbContext.Database.CanConnectAsync();
    if (canConnect)
    {
        logger.LogInformation("✅ Database connection successful!");
    }
    else
    {
        logger.LogError("❌ Cannot connect to database!");
    }
}
catch (Exception ex)
{
    logger.LogError(ex, "❌ Database connection error: {Message}", ex.Message);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

logger.LogInformation("✅ User Service is ready!");
app.Run();