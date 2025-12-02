# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY ["SmartLocalBusiness.sln", "./"]

# Copy all csproj files
COPY ["Backend/Common/Shared/Shared.csproj", "Backend/Common/Shared/"]
COPY ["Backend/Common/Domain/Domain.csproj", "Backend/Common/Domain/"]
COPY ["Backend/Common/Infrastructure/Infrastructure.csproj", "Backend/Common/Infrastructure/"]
COPY ["Backend/Services/BusinessService/BusinessService.csproj", "Backend/Services/BusinessService/"]

# Restore dependencies
RUN dotnet restore "Backend/Services/BusinessService/BusinessService.csproj"

# Copy everything else
COPY . .

# Build the project
WORKDIR "/src/Backend/Services/BusinessService"
RUN dotnet build "BusinessService.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "BusinessService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5001
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BusinessService.dll"]
