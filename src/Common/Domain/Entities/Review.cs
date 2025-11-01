namespace SmartLocalBusiness.Domain.Entities
{
      public class Review
    {
        public int ReviewId { get; set; }
        public int BusinessId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }
        public string ReviewText { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}