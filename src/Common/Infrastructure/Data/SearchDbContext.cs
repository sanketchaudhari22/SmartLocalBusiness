using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.Domain.Entities;
using SmartLocalBusiness.Shared.DTOs;

namespace SearchService.Data
{
    public class SearchDbContext : DbContext
    {
        public SearchDbContext(DbContextOptions<SearchDbContext> options)
            : base(options)
        {
        }

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Service> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // DTOs from Stored Procedures (keyless)
            modelBuilder.Entity<BusinessDto>().HasNoKey().ToView(null);
            modelBuilder.Entity<NearbyBusinessDto>().HasNoKey().ToView(null);
        }
    }
}
