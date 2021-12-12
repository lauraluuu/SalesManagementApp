
namespace SalesManagementApp.Models
{
    public interface ISalesService
    {
        void Delete(Sales prSales);
        List<Sales> GetAll();
        Sales GetById(int prId);
        Sales Save(Sales prSales);
        Sales Update(Sales prSales);
    }
}