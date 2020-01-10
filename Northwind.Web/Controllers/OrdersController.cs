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
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public OrdersController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns an order including its order details
        /// </summary>
        /// <returns>an order</returns> 
        [HttpGet("")]
        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWholeOrder(int orderId)
        {
            var order = await dataService.OrderRepository.GetWholeOrderAsync(orderId);
            return Ok(order);
        }

        /// <summary>
        /// Returns All Orders
        /// </summary>
        /// <returns>an order</returns> 
        [HttpGet("getallorders")]
        [ProducesResponseType(typeof(IList<Entities.Order>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await dataService.OrderRepository.Query(OrderProjections.WithTotal).ToListAsync();
            return Ok(orders);
        }

        /// <summary>
        /// Saves an order including its order details
        /// </summary>
        /// <returns>The order</returns> 
        [HttpPut("")]
        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveWholeOrder(Order order)
        {
            await dataService.OrderRepository.SaveWholeOrderAsync(order);
            return await GetWholeOrder(order.OrderId);
        }



        /// <summary>
        /// Add an order including its order details
        /// </summary>
        /// <returns>Add order</returns> 
        [HttpPost("")]

        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddOrder(Order order)
        {
            await dataService.OrderRepository.AddOrderAsync(order);
            return await GetWholeOrder(order.OrderId);
        }


        /// <summary>
        /// Gets the order headers that meet the search criteria
        /// </summary>
        /// <returns>The order</returns> 
        [HttpPost("search")]
        [ProducesResponseType(typeof(IList<Order>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Search(OrderCriteria searchCriteria)
        {
            var orders = await dataService.OrderRepository.SearchQuery(searchCriteria)
                .OrderByDesc(nameof(Order.OrderId))
                .ToListAsync(0,199);
            return Ok(orders);
        }
    }
}
