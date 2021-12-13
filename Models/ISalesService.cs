
using SalesManagementApp.Data.ViewModels;

namespace SalesManagementApp.Models
{
    public interface ISalesService
    {
        void Delete(Sales prSales);
        List<Sales> GetAll();
        Sales GetById(int prId);
        Sales Save(NewSalesVM prSales);
        Sales Update(Sales prSales);
    }
}