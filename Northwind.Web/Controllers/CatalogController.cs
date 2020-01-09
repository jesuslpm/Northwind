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
    [Route("catalog")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public CatalogController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns all products in the catalog
        /// </summary>
        /// <returns>a list of products</returns> 
        [HttpGet("products")]
        [ProducesResponseType(typeof(IList<Entities.Product>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProducts()
        {
            var products = await dataService.ProductRepository.Query(ProductProjections.Basic)
                .OrderBy(nameof(Product.ProductName))
                .ToListAsync();
            return Ok(products);
        }

        /// <summary>
        /// Product by Id
        /// </summary>
        /// <returns>Product By Id</returns> 
        [HttpGet("products/{productId:int}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProductById(int productId)
        {
            var product = await dataService.ProductRepository.GetAsync(ProductProjections.Basic, productId);

            return Ok(product);
        }

        /// <summary>
        /// Returns all categories
        /// </summary>
        /// <returns>a list of categories</returns> 
        [HttpGet("categories")]
        [ProducesResponseType(typeof(IList<Entities.Category>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await dataService.CategoryRepository.Query(CategoryProjections.Minimal)
                .OrderBy(nameof(Category.CategoryName))
                .ToListAsync();
            return Ok(categories);
        }

        /// <summary>
        /// Returns all suppliers
        /// </summary>
        /// <returns>a list of suppliers</returns>
        [HttpGet("suppliers")]
        [ProducesResponseType(typeof(IList<Entities.Supplier>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSuppliers()
        {
            var suppliers = await dataService.SupplierRepository.Query(SupplierProjections.BaseTable)
                .OrderBy(nameof(Supplier.CompanyName))
                .ToListAsync();
            return Ok(suppliers);
        }
    }
}