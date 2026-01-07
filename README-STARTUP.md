# Smart Local Business - Quick Start Guide

## Prerequisites

Before running the application, make sure you have:

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
3. **SQL Server** - SQL Server Express or higher

---

## Database Setup

### Option 1: Run SQL Script (Recommended)

1. Open **SQL Server Management Studio (SSMS)**
2. Connect to your SQL Server instance
3. Open the file: `setup-database.sql`
4. Execute the script (F5)

### Option 2: Update Connection String

If you have a different SQL Server, update the connection string in:
- `Backend/Services/UserService/appsettings.json`
- `Backend/Services/BusinessService/appsettings.json`
- `Backend/Services/BookingService/appsettings.json`
- `Backend/Services/ReviewService/appsettings.json`
- `Backend/Services/SearchService/appsettings.json`

---

## Starting the Application

### Quick Start (One Click)

**Double-click** `START.bat` to launch all services.

### Manual Start

1. **Start Backend Services:**
   ```bash
   cd Backend/Services/UserService && dotnet run
   cd Backend/Services/BusinessService && dotnet run
   cd Backend/Services/BookingService && dotnet run
   cd Backend/Services/SearchService && dotnet run
   cd Backend/Services/ReviewService && dotnet run
   cd Backend/Services/ApiGateway && dotnet run
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install  # First time only
   npm run dev
   ```

---

## Accessing the Application

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **API Gateway** | http://localhost:5005 |
| **Swagger UI** | http://localhost:5005/swagger |

---

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartlocal.com | Admin@123 |
| Business | business@test.com | Business@123 |
| Customer | customer@test.com | Customer@123 |

---

## Stopping the Application

**Double-click** `stop-all.bat` to stop all services.

---

## Service Ports

| Service | Port |
|---------|------|
| UserService | 5000 |
| BusinessService | 5001 |
| BookingService | 5002 |
| SearchService | 5003 |
| ReviewService | 5004 |
| API Gateway | 5005 |
| Frontend | 3000 |

---

## Troubleshooting

### Database Connection Error
- Make sure SQL Server is running
- Verify the connection string in appsettings.json
- Run `setup-database.sql` to create the database

### Port Already in Use
- Run `stop-all.bat` to kill existing processes
- Check if another application is using the port

### Frontend Not Loading
- Make sure you ran `npm install` in the frontend folder
- Check if Node.js is installed correctly
