namespace SmartLocalBusiness.Domain.Entities
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int BusinessId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // ✅ Navigation properties
        public virtual Business? Business { get; set; }
        public virtual User? User { get; set; }
    }
}