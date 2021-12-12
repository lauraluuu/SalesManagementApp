using Microsoft.AspNetCore.Mvc;
using SalesManagementApp.Models;

namespace SalesManagementApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ICustomerService _ICustomerService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ICustomerService prCustomerService)
        {
            _logger = logger;
            _ICustomerService = prCustomerService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //Dependency Injection
            //GET CUSTOMER
            //List<Customer> customers = _ICustomerService.GetAll();
            //List<Customer> customers = _ICustomerService.GetByName("John");

            //ADD CUSTOMER
            /*    Customer newCustomer = new Customer()
                {
                    Name = "Jack",
                    Address = "Manukau"
                };
                _ICustomerService.Save(newCustomer);*/

            //UPDATE CUSTOMER
        /*    Customer customerToUpdate = _ICustomerService.GetByName("Jack").FirstOrDefault();
            customerToUpdate.Name = "Jack Updated";
            _ICustomerService.Update(customerToUpdate);*/

            //DELETE CUSTOMER
        /*    Customer customerToUpdate = _ICustomerService.GetByName("Jack Updated").FirstOrDefault();
            _ICustomerService.Delete(customerToUpdate);
        */
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}