using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMSAPI.Models
{
    public class Resident
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RId { get; set; }

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

        public DateTime MoveinDate { get; set; }

        public DateTime? MoveoutDate { get;set; }

        public bool is_Active { get; set; }
    }
}
