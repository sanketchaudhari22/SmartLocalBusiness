🧠 SmartLocalBusiness – Microservices-Based Platform

🚀 Overview

SmartLocalBusiness is a full-stack, microservices-based system built using .NET Core, Entity Framework, and Ocelot API Gateway.
The platform connects local businesses, users, and services with features like booking, reviews, and intelligent search.

🏗️ Project Architecture

The system follows a microservices architecture, where each module runs independently and communicates via the Ocelot API Gateway.

🧩 Services Included:
Service Name	Description	Port
🧍‍♂️ User Service	Handles user registration, login, and authentication (JWT)	5000
🏢 Business Service	Manages business listings, categories, and details	5001
📅 Booking Service	Handles booking creation, status, and cancellations	5002
🔍 Search Service	Performs advanced & nearby business search	5003
⭐ Review Service	Handles business reviews and ratings	5004
🚪 API Gateway	Routes and aggregates all service requests	5005
⚙️ Tech Stack

Backend:

ASP.NET Core 9.0 Web API

Entity Framework Core

MS SQL Server

AutoMapper

Repository Pattern + DTOs

Ocelot API Gateway

Swagger for API Documentation
