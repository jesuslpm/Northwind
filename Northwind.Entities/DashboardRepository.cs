using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using inercya.EntityLite;
using Newtonsoft.Json;

namespace Northwind.Entities
{
    public class DashboardCriteria
    {
        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? DateFrom { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? DateTo { get; set; }
    }
    
	public class DashboardEntity
	{
		public List<OrderInfoCountry> orderInfoCountries { get; set; }

		public List<OrderInfoCategory> orderInfoCategories { get; set; }
	}
    public class OrderInfoCountry
    {
		public Int32 Quantity
		{
			get;set;
			
		}
		public String ShipCountry
		{
			get;set;
			
		}
		public Decimal? OrderDetailAmount
		{
			get;set;
		}
		
	}

	public class OrderInfoCategory
	{
		public Int32 Quantity
		{
			get; set;

		}

		public Decimal? OrderDetailAmount
		{
			get; set;
		}

		public String CategoryName
		{
			get;
			set;
		}
	}

	public partial class OrderInfoRepository
    {
        public IQueryLite<OrderInfo> SearchQuery(DashboardCriteria criteria)
        {
            var query = this.Query(OrderInfoProjections.Dashboard);
            
            if (criteria.DateFrom.HasValue)
            {
                query.Where(nameof(OrderInfo.OrderDate), OperatorLite.GreaterOrEquals, criteria.DateFrom);
            }
            if (criteria.DateTo.HasValue)
            {
                query.Where(nameof(OrderInfo.OrderDate), OperatorLite.LessOrEquals, criteria.DateTo);
            }
            return query;

        }
    }
}
