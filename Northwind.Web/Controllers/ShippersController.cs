using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Northwind.Entities;
using inercya.EntityLite;
using System.Collections.Generic;

namespace Northwind.Web.Controllers
{
    [Route("shippers")]
    [ApiController]
    public class ShippersController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public ShippersController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns Customers List
        /// </summary>
        /// <returns>Customer List</returns> 
        [HttpGet("getallshippers")]
        [ProducesResponseType(typeof(IList<Shipper>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllShippers()
        {
            var customers = await dataService.ShipperRepository
                .Query(ShipperProjections.BaseTable)
                .OrderBy(nameof(Shipper.CompanyName))
                .ToListAsync();
            return Ok(customers);
        }
    }
}