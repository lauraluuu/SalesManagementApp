namespace SalesManagementApp.Models
{
    public class CustomerService : ICustomerService
    {
        public AppDataContext _context { get; set; }
        public CustomerService(AppDataContext context)
        {
            _context = context;
        }

        public List<Customer> GetAll()
        {
            return _context.Customer.ToList();
        }
        public List<Customer> GetByName(string prName)
        {
            var linq = from customers in _context.Customer select customers;

            if (!string.IsNullOrWhiteSpace(prName))
            {
                linq = linq.Where(x => x.Name.ToUpper().Contains(prName.ToUpper()));
            }

            return linq.ToList();
        }
        public Customer Save(Customer prCustomer)
        {
            _context.Customer.Add(prCustomer);
            _context.SaveChanges();

            return prCustomer;
        }
        public Customer Update(Customer prCustomer)
        {
            Customer customerFromDB = _context.Customer.First(x => x.Id == prCustomer.Id);
            _context.Entry(customerFromDB).CurrentValues.SetValues(prCustomer);
            _context.SaveChanges();

            return prCustomer;
        }
        public void Delete(Customer prCustomer)
        {
            _context.Entry(prCustomer).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }

    }
}
