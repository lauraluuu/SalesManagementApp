
namespace SalesManagementApp.Models
{
    public interface IStoreService
    {
        void Delete(Store prStore);
        List<Store> GetAll();
        List<Store> GetByName(string prName);
        Store Save(Store prStore);
        Store Update(Store prStore);
    }
}