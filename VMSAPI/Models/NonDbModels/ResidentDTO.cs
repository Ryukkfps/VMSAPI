using System.ComponentModel.DataAnnotations;

namespace VMSAPI.Models.NonDbModels
{
    public class ResidentDTO
    {
        [Required]
        public int UnitId { get; set; }

        [Required]
        public string FName { get; set; }

        [Required]
        public string LName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string IDProofType { get; set; }

        [Required]
        public string IDProofNumber { get; set; }
    }
}
