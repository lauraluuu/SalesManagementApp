namespace SalesManagementApp.Data.ViewModels
{
    public class NewSalesVM
    {
        public int Id { get; set; }
        public DateTime DateSold { get; set; }

        //Navigation Properties
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public int StoreId { get; set; }
    }
}
