
namespace SalesManagementApp.Models
{
    public interface IProductService
    {
        void Delete(Product prProduct);
        List<Product> GetAll();
        Product GetById(int prId);
        Product Save(Product prProduct);
        Product Update(Product prProduct);
    }
}