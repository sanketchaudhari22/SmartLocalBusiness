using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using MMLib.SwaggerForOcelot.DependencyInjection;
using MMLib.SwaggerForOcelot.Middleware;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ---------------- CONFIG ----------------
// Load ocelot.json or ocelot.Docker.json based on environment
var ocelotConfigFile = builder.Environment.EnvironmentName == "Docker"
    ? "ocelot.Docker.json"
    : "ocelot.json";

builder.Configuration.AddJsonFile(ocelotConfigFile, optional: false, reloadOnChange: true);

// ---------------- SWAGGER + CONTROLLERS ----------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerForOcelot(builder.Configuration);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SmartLocalBusiness API Gateway",
        Version = "v1",
        Description = "Ocelot Gateway combining all microservices 🚀"
    });
});

// ---------------- OCELOT ----------------
builder.Services.AddOcelot(builder.Configuration);

// ---------------- ✅ CORS for React Frontend ----------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",      // React dev server
                "http://localhost",           // Frontend in Docker
                "http://localhost:80",        // Frontend in Docker (explicit port)
                "http://frontend"             // Docker container name
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// ---------------- SWAGGER UI ----------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseSwaggerForOcelotUI(options =>
    {
        options.PathToSwaggerGenerator = "/swagger/docs";
    });
}
else
{
    app.UseSwaggerForOcelotUI(options =>
    {
        options.PathToSwaggerGenerator = "/swagger/docs";
    });
}

// ---------------- ⚡ IMPORTANT FIXES ----------------

// ❌ Turn OFF HTTPS redirection (to avoid localhost mismatch)
//// app.UseHttpsRedirection();

// ✅ Enable CORS before Ocelot
app.UseCors("AllowReactApp");

// ✅ Handle CORS preflight (OPTIONS requests)
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
    }
    else
    {
        await next();
    }
});

// ✅ Ocelot must run last
await app.UseOcelot();

// Authorization (optional for internal APIs)
app.UseAuthorization();
app.MapControllers();

app.Run();
