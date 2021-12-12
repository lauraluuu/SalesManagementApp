
namespace SalesManagementApp.Models
{
    public interface ICustomerService
    {
        void Delete(Customer prCustomer);
        List<Customer> GetAll();
        List<Customer> GetByName(string prName);
        Customer Save(Customer prCustomer);
        Customer Update(Customer prCustomer);
    }
}