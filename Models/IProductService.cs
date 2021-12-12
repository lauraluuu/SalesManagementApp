
namespace SalesManagementApp.Models
{
    public interface IProductService
    {
        void Delete(Product prProduct);
        List<Product> GetAll();
        List<Product> GetByName(string prName);
        Product Save(Product prProduct);
        Product Update(Product prProduct);
    }
}