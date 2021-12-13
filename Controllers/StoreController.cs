using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesManagementApp.Models;

namespace SalesManagementApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _IStoreService;

        public StoreController(IStoreService prIStoreService)
        {
            _IStoreService = prIStoreService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Store> cResult = _IStoreService.GetAll();
            return Ok(cResult);
        }

        [HttpGet]
        public IActionResult Search(int prId)
        {
            Store cResult = _IStoreService.GetById(prId);
            return Ok(cResult);
        }

        [HttpPut]
        public IActionResult Update(Store prStore)
        {
            return Ok(_IStoreService.Update(prStore));
        }

        [HttpPost]
        public IActionResult Save(Store prStore)
        {
            return Ok(_IStoreService.Save(prStore));
        }

        [HttpDelete]
        public IActionResult Delete(Store prStore)
        {
            _IStoreService.Delete(prStore);
            return Ok();
        }
    }
}
