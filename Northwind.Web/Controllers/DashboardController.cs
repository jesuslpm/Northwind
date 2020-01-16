using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Northwind.Entities;
using inercya.EntityLite;

namespace Northwind.Web.Controllers
{
    [Route("dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public DashboardController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns an order including its order details
        /// </summary>
        /// <returns>an order</returns> 
        [HttpGet("")]
        [ProducesResponseType(typeof(IList<Entities.OrderInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderInfosByDate(DashboardCriteria dashboardCriteria)
        {
            var orderInfos = await dataService.OrderInfoRepository.SearchQuery(dashboardCriteria)
                .OrderByDesc(nameof(Order.OrderId))
                .ToListAsync();
            return Ok(orderInfos);
        }
    }
}