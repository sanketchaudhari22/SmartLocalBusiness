# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY ["SmartLocalBusiness.sln", "./"]

# Copy all csproj files
COPY ["Backend/Common/Shared/Shared.csproj", "Backend/Common/Shared/"]
COPY ["Backend/Common/Domain/Domain.csproj", "Backend/Common/Domain/"]
COPY ["Backend/Common/Infrastructure/Infrastructure.csproj", "Backend/Common/Infrastructure/"]
COPY ["Backend/Services/BookingService/BookingService.csproj", "Backend/Services/BookingService/"]

# Restore dependencies
RUN dotnet restore "Backend/Services/BookingService/BookingService.csproj"

# Copy everything else
COPY . .

# Build the project
WORKDIR "/src/Backend/Services/BookingService"
RUN dotnet build "BookingService.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "BookingService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5002
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookingService.dll"]
