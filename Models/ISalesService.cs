
using SalesManagementApp.Data.ViewModels;

namespace SalesManagementApp.Models
{
    public interface ISalesService
    {
        void Delete(int id);
        List<Sales> GetAll();
        Sales GetById(int prId);
        Sales Save(NewSalesVM prSales);
        Sales Update(NewSalesVM prSales);
    }
}