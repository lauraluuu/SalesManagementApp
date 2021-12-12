namespace SalesManagementApp.Models
{
    public class StoreService : IStoreService
    {
        public AppDataContext _context { get; set; }
        public StoreService(AppDataContext context)
        {
            _context = context;
        }

        public List<Store> GetAll()
        {
            return _context.Store.ToList();
        }
        public List<Store> GetByName(string prName)
        {
            var linq = from stores in _context.Store select stores;

            if (!string.IsNullOrWhiteSpace(prName))
            {
                linq = linq.Where(x => x.Name.ToUpper().Contains(prName.ToUpper()));
            }

            return linq.ToList();
        }
        public Store Save(Store prStore)
        {
            _context.Store.Add(prStore);
            _context.SaveChanges();

            return prStore;
        }
        public Store Update(Store prStore)
        {
            Store storeFromDB = _context.Store.First(x => x.Id == prStore.Id);
            _context.Entry(storeFromDB).CurrentValues.SetValues(prStore);
            _context.SaveChanges();

            return prStore;
        }
        public void Delete(Store prStore)
        {
            _context.Entry(prStore).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }

    }
}
