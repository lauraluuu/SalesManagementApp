
namespace SalesManagementApp.Models
{
    public interface ICustomerService
    {
        void Delete(Customer prCustomer);
        List<Customer> GetAll();
        Customer GetById(int prId);
        Customer Save(Customer prCustomer);
        Customer Update(Customer prCustomer);
    }
}