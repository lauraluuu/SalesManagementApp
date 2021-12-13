
namespace SalesManagementApp.Models
{
    public interface IStoreService
    {
        void Delete(Store prStore);
        List<Store> GetAll();
        Store GetById(int prId);
        Store Save(Store prStore);
        Store Update(Store prStore);
    }
}