using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesManagementApp.Data.ViewModels;
using SalesManagementApp.Models;

namespace SalesManagementApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _ISalesService;

        public SalesController(ISalesService prISalesService)
        {
            _ISalesService = prISalesService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Sales> cResult = _ISalesService.GetAll();
            return Ok(cResult);
        }

        [HttpGet]
        public IActionResult Search(int prId)
        {
            Sales cResult = _ISalesService.GetById(prId);
            return Ok(cResult);
        }

        [HttpPut]
        public IActionResult Update(Sales prSales)
        {
            return Ok(_ISalesService.Update(prSales));
        }

        [HttpPost]
        public IActionResult Save(NewSalesVM prSales)
        {
            return Ok(_ISalesService.Save(prSales));
        }

        [HttpDelete]
        public IActionResult Delete(Sales prSales)
        {
            _ISalesService.Delete(prSales);
            return Ok();
        }
    }
}
