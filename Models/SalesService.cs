using Microsoft.EntityFrameworkCore;
using SalesManagementApp.Data.ViewModels;

namespace SalesManagementApp.Models
{
    public class SalesService : ISalesService
    {
        public AppDataContext _context { get; set; }
        public SalesService(AppDataContext context)
        {
            _context = context;
        }

        public List<Sales> GetAll()
        {
            var SalesList = _context.Sales.Include(n => n.Customer)
                .Include(n => n.Store).Include(n => n.Product).ToList();
            return SalesList;
        }
        public Sales GetById(int prId)
        {

            if (prId != null)
            {
                Sales salesFromDB = _context.Sales
                    .Include(n => n.Customer).Include(n => n.Store).
                    Include(n => n.Product).First(x => x.Id == prId);
                return salesFromDB;
            }

            return null;
        }
        public Sales Save(NewSalesVM prSales)
        {
            var newSales = new Sales()
            {
                StoreId = prSales.StoreId,
                DateSold = prSales.DateSold,
                CustomerId = prSales.CustomerId,
                ProductId = prSales.ProductId,
            };

            _context.Sales.Add(newSales);
            _context.SaveChanges();

            Sales salesResult = _context.Sales
                .Include(n => n.Customer).Include(n => n.Store).
                Include(n => n.Product).First(x => x.Id == newSales.Id);

            return salesResult;
        }
        public Sales Update(NewSalesVM prSales)
        {
            Sales salesFromDB = _context.Sales.FirstOrDefault(n => n.Id == prSales.Id);

            _context.Entry(salesFromDB).CurrentValues.SetValues(prSales);
            _context.SaveChanges();

            Sales salesResult = _context.Sales
                .Include(n => n.Customer).Include(n => n.Store).
                Include(n => n.Product).First(x => x.Id == prSales.Id);

            return salesResult;
        }

        public void Delete(int id)
        {
            var prSales = _context.Sales.Include(n => n.Customer).Include(n => n.Store).
                    Include(n => n.Product).FirstOrDefault(x => x.Id == id);
            

            //_context.Sales.Remove(prSales);
            _context.Entry(prSales).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
