namespace SmartLocalBusiness.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IconUrl { get; set; }  // ✅ Made nullable
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // ✅ One-to-many relationship with Business
        public ICollection<Business> Businesses { get; set; } = new List<Business>();
    }
}