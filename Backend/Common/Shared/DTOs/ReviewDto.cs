namespace SmartLocalBusiness.Shared.DTOs
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }
        public int BusinessId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
    }
}
