namespace SmartLocalBusiness.Domain.Entities
{
    public class Business
    {
        public int BusinessId { get; set; }
        public int? UserId { get; set; }
        public int? CategoryId { get; set; }
        public string? BusinessName { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public decimal? Rating { get; set; } = 0;
        public int? TotalReviews { get; set; } = 0;
        public bool? IsVerified { get; set; } = false;
        public bool? IsActive { get; set; } = true;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public Category? Category { get; set; }
        public ICollection<Service>? Services { get; set; }
    }
}
