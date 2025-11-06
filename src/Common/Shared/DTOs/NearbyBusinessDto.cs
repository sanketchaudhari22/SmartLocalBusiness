namespace SmartLocalBusiness.Shared.DTOs
{
    public class NearbyBusinessDto
    {
        public int BusinessId { get; set; }
        public string BusinessName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public int TotalReviews { get; set; }
        public bool IsVerified { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public double DistanceInKm { get; set; }
    }
}
