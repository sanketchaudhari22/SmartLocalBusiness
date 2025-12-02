# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution file
COPY ["SmartLocalBusiness.sln", "./"]

# Copy ApiGateway csproj file
COPY ["Backend/Services/ApiGateway/ApiGateway.csproj", "Backend/Services/ApiGateway/"]

# Restore dependencies
RUN dotnet restore "Backend/Services/ApiGateway/ApiGateway.csproj"

# Copy everything else
COPY . .

# Build the project
WORKDIR "/src/Backend/Services/ApiGateway"
RUN dotnet build "ApiGateway.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ApiGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5005
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
