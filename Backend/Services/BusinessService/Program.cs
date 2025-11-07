using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Infrastructure.Services;
using BusinessService.Services;

var builder = WebApplication.CreateBuilder(args);

// -------------------- CONTROLLERS --------------------
builder.Services.AddControllers();

// -------------------- DATABASE --------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// -------------------- REDIS --------------------
builder.Services.AddStackExchangeRedisCache(opt =>
{
    opt.Configuration = builder.Configuration.GetConnectionString("RedisConnection");
});

// -------------------- DEPENDENCY INJECTION --------------------
builder.Services.AddScoped<ICacheService, RedisCacheService>();
builder.Services.AddScoped<IBusinessService, BusinessService.Services.BusinessService>();

// -------------------- ✅ CORS CONFIG --------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",  // React Frontend
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
        Title = "Business Service API",
        Version = "v1",
        Description = "Handles business registration, listings & data"
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
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Business Service API v1");
        c.RoutePrefix = "swagger";
    });
}

// -------------------- PIPELINE --------------------

// ❌ Remove HTTPS redirection for local setup
// app.UseHttpsRedirection();

// ✅ Enable CORS globally (before controller mapping)
app.UseCors("AllowFrontend");

app.UseAuthorization();

// ✅ Map Controllers (API endpoints)
app.MapControllers();

// ✅ Run Application
app.Run();
