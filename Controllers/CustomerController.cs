using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesManagementApp.Models;

namespace SalesManagementApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _ICustomerService;

        public CustomerController(ICustomerService prICustomerService)
        {
            _ICustomerService = prICustomerService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Customer> cResult = _ICustomerService.GetAll();
            return Ok(cResult);
        }

        [HttpGet]
        public IActionResult Search(string prName)
        {
            List<Customer> cResult = _ICustomerService.GetByName(prName);
            return Ok(cResult);
        }

        [HttpPut]
        public IActionResult Update(Customer prCustomer)
        {
            return Ok(_ICustomerService.Update(prCustomer));
        }

        [HttpPost]
        public IActionResult Save(Customer prCustomer)
        {
            return Ok(_ICustomerService.Save(prCustomer));
        }

        [HttpDelete]
        public IActionResult Delete(Customer prCustomer)
        {
            _ICustomerService.Delete(prCustomer);
            return Ok();
        }
    }
}
