using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Northwind.Entities;
using inercya.EntityLite;
using System.Collections.Generic;
using System.Linq;

namespace Northwind.Web.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly NorthwindDataService dataService;

        public EmployeesController(NorthwindDataService dataService)
        {
            this.dataService = dataService;
        }

        /// <summary>
        /// Returns Employee List
        /// </summary>
        /// <returns>Employee List</returns> 
        [HttpGet("getallemployees")]
        [ProducesResponseType(typeof(IList<Entities.EmployeeMinimal>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await dataService.EmployeeRepository.Query(EmployeeProjections.Minimal).ToListAsync();
            return Ok(employees.Select(x => new EmployeeMinimal() {EmployeeId = x.EmployeeId, EmployeeFullName=x.EmployeeFullName }));


        }
    }
}