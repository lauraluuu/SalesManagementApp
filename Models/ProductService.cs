namespace SalesManagementApp.Models
{
    public class ProductService : IProductService
    {
        public AppDataContext _context { get; set; }
        public ProductService(AppDataContext context)
        {
            _context = context;
        }

        public List<Product> GetAll()
        {
            return _context.Product.ToList();
        }
        public List<Product> GetByName(string prName)
        {
            var linq = from products in _context.Product select products;

            if (!string.IsNullOrWhiteSpace(prName))
            {
                linq = linq.Where(x => x.Name.ToUpper().Contains(prName.ToUpper()));
            }

            return linq.ToList();
        }
        public Product Save(Product prProduct)
        {
            _context.Product.Add(prProduct);
            _context.SaveChanges();

            return prProduct;
        }
        public Product Update(Product prProduct)
        {
            Product productFromDB = _context.Product.First(x => x.Id == prProduct.Id);
            _context.Entry(productFromDB).CurrentValues.SetValues(prProduct);
            _context.SaveChanges();

            return prProduct;
        }
        public void Delete(Product prProduct)
        {
            _context.Entry(prProduct).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }

    }
}

