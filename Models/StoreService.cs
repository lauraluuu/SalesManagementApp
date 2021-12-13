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
        public Store GetById(int prId)
        {

            if (prId != null)
            {
                Store storesFromDB = _context.Store.First(x => x.Id == prId);
                return storesFromDB;
            }

            return null;
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
