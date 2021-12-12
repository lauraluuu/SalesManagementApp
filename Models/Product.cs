using System.ComponentModel.DataAnnotations;

namespace SalesManagementApp.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        //navigation property
        public List<Sales> ProductSold { get; set; }
    }
}
