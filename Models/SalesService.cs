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
            return _context.Sales.ToList();
        }
        public Sales GetById(int prId)
        {

            if (prId != null)
            {
                Sales salesFromDB = _context.Sales.First(x => x.Id == prId);
                return salesFromDB;
            }

            return null;
        }
        public Sales Save(Sales prSales)
        {
            _context.Sales.Add(prSales);
            _context.SaveChanges();

            return prSales;
        }
        public Sales Update(Sales prSales)
        {
            Sales salesFromDB = _context.Sales.First(x => x.Id == prSales.Id);
            _context.Entry(salesFromDB).CurrentValues.SetValues(prSales);
            _context.SaveChanges();

            return prSales;
        }
        public void Delete(Sales prSales)
        {
            _context.Entry(prSales).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
