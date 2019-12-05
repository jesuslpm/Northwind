using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using inercya.EntityLite;

namespace Northwind.Entities
{

    public class OrderCriteria
    {
        public string CustomerId { get; set; }
        public DateTime? OrderDateFrom { get; set; }
        public DateTime? OrderDateTo { get; set; }
        public int? EmployeeId { get; set; }
    }

    public partial class OrderRepository
    {
        public async Task SaveWholeOrderAsync(Order entity)
        {
            if (entity.Details == null)
            {
                await base.SaveAsync(entity).ConfigureAwait(false);
                return;
            }
            this.DataService.BeginTransaction();
            try
            {
                await base.SaveAsync(entity).ConfigureAwait(false);
                var currentDetails = await this.DataService.OrderDetailRepository
                    .Query(OrderDetailProjections.Basic)
                    .Where(nameof(OrderDetail.OrderId), OperatorLite.Equals, entity.OrderId)
                    .ToListAsync()
                    .ConfigureAwait(false);
                await this.DataService.OrderDetailRepository.SaveAsync(entity.Details, currentDetails).ConfigureAwait(false);
                DataService.Commit();
            }
            catch
            {
                if (this.DataService.IsActiveTransaction) this.DataService.Rollback();
                throw;
            }
        }

        public async Task<Order> GetWholeOrderAsync(int orderId)
        {
            var order = await this.GetAsync(OrderProjections.Basic, orderId).ConfigureAwait(false);
            if (order == null) return null;
            order.Details = await this.DataService.OrderDetailRepository
                    .Query(OrderDetailProjections.Basic)
                    .Where(nameof(OrderDetail.OrderId), OperatorLite.Equals, orderId)
                    .ToListAsync()
                    .ConfigureAwait(false);
            return order;
        }

        public IQueryLite<Order> SearchQuery(OrderCriteria criteria)
        {
            var query = this.Query(OrderProjections.Basic);

            if (criteria.CustomerId != null)
            {
                query.Where(nameof(Order.CustomerId), OperatorLite.Equals, criteria.CustomerId);
            }

            if (criteria.EmployeeId.HasValue)
            {
                query.Where(nameof(Order.EmployeeId), OperatorLite.Equals, criteria.EmployeeId);
            }

            if (criteria.OrderDateFrom.HasValue)
            {
                query.Where(nameof(Order.OrderDate), OperatorLite.GreaterOrEquals, criteria.OrderDateFrom.Value);
            }

            if (criteria.OrderDateTo.HasValue)
            {
                query.Where(nameof(Order.OrderDate), OperatorLite.LessOrEquals, criteria.OrderDateTo.Value);
            }

            return query;

        }
    }
}
