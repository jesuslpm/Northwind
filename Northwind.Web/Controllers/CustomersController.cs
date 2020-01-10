using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Northwind.Entities;
using inercya.EntityLite;
using System.Collections.Generic;

namespace Northwind.Web.Controllers
{
    [Route("customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public CustomersController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns Customers List
        /// </summary>
        /// <returns>Customer List</returns> 
        [HttpGet("getallcustomers")]
        [ProducesResponseType(typeof(IList<Customer>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await dataService.CustomerRepository.Query(CustomerProjections.BaseTable)
                .OrderBy(nameof(Customer.ContactName))
                .ToListAsync();
            return Ok(customers);
        }

        /// <summary>
        /// Return Customer By Id
        /// </summary>
        /// <returns>Customer Detail</returns> 
        [HttpGet]
        [ProducesResponseType(typeof(Customer), StatusCodes.Status200OK)]
        public async Task<IActionResult> CustomerById(string customerId)
        {
            var customers = await dataService.CustomerRepository.GetAsync(CustomerProjections.BaseTable, customerId);
            return Ok(customers);
        }

        
    }
}