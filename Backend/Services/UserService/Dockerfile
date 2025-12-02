# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY ["SmartLocalBusiness.sln", "./"]

# Copy all csproj files
COPY ["Backend/Common/Shared/Shared.csproj", "Backend/Common/Shared/"]
COPY ["Backend/Common/Domain/Domain.csproj", "Backend/Common/Domain/"]
COPY ["Backend/Common/Infrastructure/Infrastructure.csproj", "Backend/Common/Infrastructure/"]
COPY ["Backend/Services/UserService/UserService.csproj", "Backend/Services/UserService/"]

# Restore dependencies
RUN dotnet restore "Backend/Services/UserService/UserService.csproj"

# Copy everything else
COPY . .

# Build the project
WORKDIR "/src/Backend/Services/UserService"
RUN dotnet build "UserService.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "UserService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5000
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserService.dll"]
