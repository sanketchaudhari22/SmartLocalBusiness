*🚀 SmartLocalBusiness* – Microservices Based Backend (ASP.NET Core + Ocelot + Swagger)
🧠 Overview

SmartLocalBusiness is a Microservices-based Backend built with .NET Core, designed to manage local businesses, users, bookings, reviews, and search features in a distributed system.
It uses Ocelot API Gateway for routing requests between services and Swagger for documentation.

🏗️ Architecture

🧩 Microservices Architecture
Each domain (User, Business, Booking, Search, Review) is a separate service

Each service has its own database connection, controllers, and DTOs

Requests flow through the API Gateway (Ocelot)

⚙️ Tech Stack
Category	Technologies
Backend Framework	ASP.NET Core 9.0
API Gateway	Ocelot
Database	MS SQL Server
ORM	Entity Framework Core
Design Pattern	Clean Architecture + Repository Pattern
API Docs	Swagger (Swashbuckle)
Communication	HTTP REST APIs
Language	C#

📁 Folder Structure
SmartLocalBusiness/
│
├── src/
│   ├── ApiGateway/              # Ocelot Gateway + Swagger aggregation
│   ├── Services/
│   │   ├── UserService/         # User registration, login, profile
│   │   ├── BusinessService/     # Business management
│   │   ├── BookingService/      # Booking creation & status updates
│   │   ├── SearchService/       # Business search & nearby logic
│   │   ├── ReviewService/       # Reviews, ratings
│   └── Shared/                  # DTOs, Responses, Common Models
│
└── SmartLocalBusiness.sln       # Solution file

🧩 Microservices and Ports
Service	Description	Port
🧍 UserService	Handles user registration, login, profile	5000
🏢 BusinessService	Manages business info and categories	5001
📅 BookingService	Booking creation, updates, cancellation	5002
🔍 SearchService	Search and nearby business logic	5003
⭐ ReviewService	Add, update, delete and view reviews	5004
🌐 API Gateway	Central entry point using Ocelot	5005
