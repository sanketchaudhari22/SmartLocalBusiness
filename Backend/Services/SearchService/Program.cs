using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<SearchDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// DI
builder.Services.AddScoped<ISearchService, SearchService.Services.SearchService>();

// CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", b =>
        b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Search Service API",
        Version = "v1",
        Description = "Handles business and service search features"
    });
});

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Search Service API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
