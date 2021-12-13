using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesManagementApp.Models
{
    public class Sales
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime DateSold { get; set; }

        //Navigation Properties
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int StoreId { get; set; }
        [ForeignKey("StoreId")]
        public Store Store { get; set; }
    }
}
