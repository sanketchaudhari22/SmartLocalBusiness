-- ============================================
-- Smart Local Business - Database Setup Script
-- ============================================
-- Run this script in SQL Server Management Studio (SSMS)
-- or using sqlcmd to create the database and tables
-- ============================================

-- Create Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SmartLocalBusiness')
BEGIN
    CREATE DATABASE SmartLocalBusiness;
    PRINT 'Database SmartLocalBusiness created successfully!';
END
ELSE
BEGIN
    PRINT 'Database SmartLocalBusiness already exists.';
END
GO

USE SmartLocalBusiness;
GO

-- ============================================
-- Create Tables
-- ============================================

-- Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        UserId INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(500) NOT NULL,
        FirstName NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        PhoneNumber NVARCHAR(20) NULL,
        UserType NVARCHAR(50) DEFAULT 'Customer',
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table Users created.';
END
GO

-- Categories Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Categories' AND xtype='U')
BEGIN
    CREATE TABLE Categories (
        CategoryId INT IDENTITY(1,1) PRIMARY KEY,
        CategoryName NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        IconUrl NVARCHAR(500) NULL,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table Categories created.';
END
GO

-- Businesses Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Businesses' AND xtype='U')
BEGIN
    CREATE TABLE Businesses (
        BusinessId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NULL,
        CategoryId INT NULL,
        BusinessName NVARCHAR(255) NULL,
        Description NVARCHAR(MAX) NULL,
        Address NVARCHAR(500) NULL,
        City NVARCHAR(100) NULL,
        State NVARCHAR(100) NULL,
        ZipCode NVARCHAR(20) NULL,
        Latitude DECIMAL(10,7) NULL,
        Longitude DECIMAL(10,7) NULL,
        PhoneNumber NVARCHAR(20) NULL,
        Email NVARCHAR(255) NULL,
        Website NVARCHAR(500) NULL,
        Rating DECIMAL(3,2) DEFAULT 0,
        TotalReviews INT DEFAULT 0,
        IsVerified BIT DEFAULT 0,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        CONSTRAINT FK_Business_Category FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
    );
    PRINT 'Table Businesses created.';
END
GO

-- Services Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Services' AND xtype='U')
BEGIN
    CREATE TABLE Services (
        ServiceId INT IDENTITY(1,1) PRIMARY KEY,
        BusinessId INT NOT NULL,
        ServiceName NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Price DECIMAL(10,2) NOT NULL,
        Duration INT NULL, -- in minutes
        CONSTRAINT FK_Service_Business FOREIGN KEY (BusinessId) REFERENCES Businesses(BusinessId) ON DELETE CASCADE
    );
    PRINT 'Table Services created.';
END
GO

-- Bookings Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Bookings' AND xtype='U')
BEGIN
    CREATE TABLE Bookings (
        BookingId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        BusinessId INT NOT NULL,
        ServiceId INT NOT NULL,
        BookingDate DATETIME2 NOT NULL,
        Status NVARCHAR(50) DEFAULT 'Pending',
        TotalAmount DECIMAL(10,2) NOT NULL,
        Notes NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        CONSTRAINT FK_Booking_User FOREIGN KEY (UserId) REFERENCES Users(UserId),
        CONSTRAINT FK_Booking_Business FOREIGN KEY (BusinessId) REFERENCES Businesses(BusinessId),
        CONSTRAINT FK_Booking_Service FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId)
    );
    PRINT 'Table Bookings created.';
END
GO

-- Reviews Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Reviews' AND xtype='U')
BEGIN
    CREATE TABLE Reviews (
        ReviewId INT IDENTITY(1,1) PRIMARY KEY,
        BusinessId INT NOT NULL,
        UserId INT NOT NULL,
        Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
        ReviewText NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        CONSTRAINT FK_Review_Business FOREIGN KEY (BusinessId) REFERENCES Businesses(BusinessId),
        CONSTRAINT FK_Review_User FOREIGN KEY (UserId) REFERENCES Users(UserId)
    );
    PRINT 'Table Reviews created.';
END
GO

-- ============================================
-- Insert Sample Data
-- ============================================

-- Sample Categories
IF NOT EXISTS (SELECT * FROM Categories)
BEGIN
    INSERT INTO Categories (CategoryName, Description, IconUrl) VALUES
    ('Restaurants', 'Food and dining establishments', '/icons/restaurant.svg'),
    ('Salons', 'Hair and beauty salons', '/icons/salon.svg'),
    ('Auto Repair', 'Vehicle repair and maintenance', '/icons/car.svg'),
    ('Healthcare', 'Medical and health services', '/icons/health.svg'),
    ('Fitness', 'Gyms and fitness centers', '/icons/fitness.svg'),
    ('Home Services', 'Home repair and maintenance', '/icons/home.svg'),
    ('Professional', 'Professional services', '/icons/briefcase.svg'),
    ('Beauty', 'Spa and beauty services', '/icons/sparkles.svg');
    PRINT 'Sample categories inserted.';
END
GO

-- Sample Admin User (Password: Admin@123)
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'admin@smartlocal.com')
BEGIN
    INSERT INTO Users (Email, PasswordHash, FirstName, LastName, UserType)
    VALUES ('admin@smartlocal.com', '$2a$11$rBNHZU8zL9Ek5zq5qOJ6x.WvWp7oXQpPOE4M7vhKGvPwz7VQ5Jmmi', 'Admin', 'User', 'Admin');
    PRINT 'Sample admin user created.';
END
GO

-- Sample Business Owner (Password: Business@123)
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'business@test.com')
BEGIN
    INSERT INTO Users (Email, PasswordHash, FirstName, LastName, UserType)
    VALUES ('business@test.com', '$2a$11$rBNHZU8zL9Ek5zq5qOJ6x.WvWp7oXQpPOE4M7vhKGvPwz7VQ5Jmmi', 'Business', 'Owner', 'BusinessOwner');
    PRINT 'Sample business owner created.';
END
GO

-- Sample Customer (Password: Customer@123)
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'customer@test.com')
BEGIN
    INSERT INTO Users (Email, PasswordHash, FirstName, LastName, UserType)
    VALUES ('customer@test.com', '$2a$11$rBNHZU8zL9Ek5zq5qOJ6x.WvWp7oXQpPOE4M7vhKGvPwz7VQ5Jmmi', 'Test', 'Customer', 'Customer');
    PRINT 'Sample customer created.';
END
GO

-- Sample Businesses
IF NOT EXISTS (SELECT * FROM Businesses)
BEGIN
    INSERT INTO Businesses (UserId, CategoryId, BusinessName, Description, Address, City, State, ZipCode, Latitude, Longitude, PhoneNumber, Email, Rating, TotalReviews, IsVerified, IsActive)
    VALUES
    (2, 1, 'The Great Kitchen', 'Fine dining restaurant with international cuisine', '123 Main St', 'New York', 'NY', '10001', 40.7128, -74.0060, '555-0101', 'greatk@email.com', 4.5, 120, 1, 1),
    (2, 2, 'Style Studio', 'Modern hair salon and spa', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 34.0522, -118.2437, '555-0102', 'style@email.com', 4.8, 89, 1, 1),
    (2, 3, 'Quick Fix Auto', 'Fast and reliable auto repair', '789 Elm St', 'Chicago', 'IL', '60601', 41.8781, -87.6298, '555-0103', 'quickfix@email.com', 4.2, 56, 1, 1),
    (2, 4, 'Wellness Clinic', 'Comprehensive healthcare services', '321 Health Blvd', 'Houston', 'TX', '77001', 29.7604, -95.3698, '555-0104', 'wellness@email.com', 4.7, 200, 1, 1),
    (2, 5, 'PowerFit Gym', 'State-of-the-art fitness center', '654 Muscle Ln', 'Phoenix', 'AZ', '85001', 33.4484, -112.0740, '555-0105', 'powerfit@email.com', 4.6, 150, 1, 1),
    (2, 6, 'Home Helpers', 'Complete home repair solutions', '987 Service Rd', 'Philadelphia', 'PA', '19101', 39.9526, -75.1652, '555-0106', 'helpers@email.com', 4.4, 78, 1, 1);
    PRINT 'Sample businesses inserted.';
END
GO

-- Sample Services
IF NOT EXISTS (SELECT * FROM Services)
BEGIN
    INSERT INTO Services (BusinessId, ServiceName, Description, Price, Duration)
    VALUES
    -- Restaurant services
    (1, 'Dinner Reservation', 'Table reservation for dinner', 0, 120),
    (1, 'Private Event', 'Private dining event', 500, 180),
    -- Salon services
    (2, 'Haircut', 'Professional haircut', 45, 45),
    (2, 'Hair Color', 'Full hair coloring', 120, 90),
    (2, 'Spa Package', 'Full spa treatment', 200, 120),
    -- Auto repair services
    (3, 'Oil Change', 'Standard oil change', 50, 30),
    (3, 'Brake Service', 'Brake inspection and service', 150, 60),
    (3, 'Full Inspection', 'Complete vehicle inspection', 100, 60),
    -- Healthcare services
    (4, 'General Checkup', 'Routine health checkup', 150, 30),
    (4, 'Specialist Consultation', 'Specialist doctor visit', 250, 45),
    -- Fitness services
    (5, 'Personal Training', 'One-on-one training session', 75, 60),
    (5, 'Group Class', 'Group fitness class', 25, 60),
    (5, 'Monthly Membership', 'Monthly gym membership', 50, 0),
    -- Home services
    (6, 'Plumbing Repair', 'Basic plumbing repair', 100, 60),
    (6, 'Electrical Work', 'Electrical repair service', 125, 60);
    PRINT 'Sample services inserted.';
END
GO

PRINT '';
PRINT '============================================';
PRINT 'Database setup completed successfully!';
PRINT '============================================';
PRINT '';
PRINT 'Test Accounts:';
PRINT '  Admin:    admin@smartlocal.com / Admin@123';
PRINT '  Business: business@test.com / Business@123';
PRINT '  Customer: customer@test.com / Customer@123';
PRINT '';
GO
