/*using SalesManagementApp.Models;

namespace SalesManagementApp.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDataContext>();
                context.Database.EnsureCreated();

                //Customer
                if(!context.Customer.Any())
                {
                    context.Customer.AddRange(new List<Customer>()
                    {
                        new Customer()
                        {
                            Name = "John",
                            Address = "Avondale",
                        },
                        new Customer()
                        {
                            Name = "Daisy",
                            Address = "New Lynn",
                        },
                        new Customer()
                        {
                            Name = "Helen",
                            Address = "Flat Bush",
                        },
                        new Customer()
                        {
                            Name = "Kiera",
                            Address = "Dannemora",
                        },
                        new Customer()
                        {
                            Name = "Daniel",
                            Address = "Kingsland",
                        },
                    });
                    context.SaveChanges();
                }
                //Product
                if (!context.Product.Any())
                {
                    context.Product.AddRange(new List<Product>()
                    {
                        new Product()
                        {
                            Name = "Apple",
                            Price = 10,
                        },
                        new Product()
                        {
                            Name = "Pear",
                            Price = 20,
                        },
                        new Product()
                        {
                            Name = "Orange",
                            Price = 30,
                        },
                    });
                    context.SaveChanges();
                }
                //Store
                if (!context.Store.Any())
                {
                    context.Store.AddRange(new List<Store>()
                    {
                        new Store()
                        {
                            Name = "Pak & Save",
                            Address = "address 1",
                        },
                        new Store()
                        {
                            Name = "Countdown",
                            Address = "address 2",
                        },
                        new Store()
                        {
                            Name = "New World",
                            Address = "address 3",
                        },
                        new Store()
                        {
                            Name = "Tai Ping",
                            Address = "address 4",
                        },
                        new Store()
                        {
                            Name = "PBTech",
                            Address = "address 5",
                        },
                    });
                    context.SaveChanges();
                }
                //Sales
                if (!context.Sales.Any())
                {

                }
            }
        }
    }
}
*/