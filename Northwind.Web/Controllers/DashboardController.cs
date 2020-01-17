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
        [HttpPost("")]
        [ProducesResponseType(typeof(DashboardEntity), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderInfosByDate(DashboardCriteria dashboardCriteria)
        {

            DashboardEntity dashboardEntity = new DashboardEntity();
            var orderInfos = await dataService.OrderInfoRepository.SearchQuery(dashboardCriteria)
                .OrderByDesc(nameof(Order.OrderId))
                .ToListAsync();


            dashboardEntity.orderInfoCategories = orderInfos
            .GroupBy(x => x.CategoryName)
            .Select(x => new OrderInfoCategory()
            {
                Quantity = x.Sum(c => c.Quantity),
                OrderDetailAmount = x.Sum(c => c.OrderDetailAmount),
                CategoryName = x.First().CategoryName
            }).ToList();


            dashboardEntity.orderInfoCountries = orderInfos
            .GroupBy(x => x.ShipCountry)
            .Select(x => new OrderInfoCountry()
            {

                Quantity = x.Sum(c => c.Quantity),
                OrderDetailAmount = x.Sum(c => c.OrderDetailAmount),
                ShipCountry = x.First().ShipCountry

            }).ToList();
           
            return Ok(dashboardEntity);
        }


    }
}