using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.Domain.Entities;

namespace SmartLocalBusiness.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // ✅ Entity Tables
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User Configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Category Configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(100);
            });

            // Business Configuration
            modelBuilder.Entity<Business>(entity =>
            {
                entity.HasKey(e => e.BusinessId);
                entity.Property(e => e.BusinessName).HasMaxLength(255);
                
                entity.HasOne(e => e.Category)
                    .WithMany(c => c.Businesses)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Service Configuration
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.ServiceId);
                entity.Property(e => e.ServiceName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Price).HasColumnType("decimal(10,2)");

                entity.HasOne(e => e.Business)
                    .WithMany(b => b.Services)
                    .HasForeignKey(e => e.BusinessId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Booking Configuration
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.BookingId);
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Business)
                    .WithMany()
                    .HasForeignKey(e => e.BusinessId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Service)
                    .WithMany(s => s.Bookings)
                    .HasForeignKey(e => e.ServiceId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Review Configuration
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.ReviewId);
                entity.Property(e => e.Rating).IsRequired();
            });
        }
    }
}