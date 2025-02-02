using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMSAPI.Models
{
    public class Society
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SId {  get; set; }
        [Required]
        public string SName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public int NumberofBlocks { get; set; }
        [Required]
        public int NumberofUnits { get; set; }
        [Required]
        [EmailAddress]
        public string SEmail { get; set; }
        [Required]
        [Phone]
        public string SPhone { get; set; }

        public DateTime TimeRegistered { get; set; }

    }
}
