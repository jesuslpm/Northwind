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
