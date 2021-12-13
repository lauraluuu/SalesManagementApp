using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesManagementApp.Models;

namespace SalesManagementApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _IProductService;

        public ProductController(IProductService prIProductService)
        {
            _IProductService = prIProductService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Product> cResult = _IProductService.GetAll();
            return Ok(cResult);
        }

        [HttpGet]
        public IActionResult Search(int prId)
        {
            Product cResult = _IProductService.GetById(prId);
            return Ok(cResult);
        }

        [HttpPut]
        public IActionResult Update(Product prProduct)
        {
            return Ok(_IProductService.Update(prProduct));
        }

        [HttpPost]
        public IActionResult Save(Product prProduct)
        {
            return Ok(_IProductService.Save(prProduct));
        }

        [HttpDelete]
        public IActionResult Delete(Product prProduct)
        {
            _IProductService.Delete(prProduct);
            return Ok();
        }
    }
}
