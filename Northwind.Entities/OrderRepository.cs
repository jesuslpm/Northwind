using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using inercya.EntityLite;
using Newtonsoft.Json;

namespace Northwind.Entities
{

    public class OrderCriteria
    {
        public ICollection<string> CustomerIds { get; set; }

        public int? OrderId { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? OrderDateFrom { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? OrderDateTo { get; set; }
        public ICollection<int?> EmployeeIds { get; set; }

        public ICollection<int?> ShipperIds { get; set; }

        public ICollection<int?> ProductIds { get; set; }

        public decimal? OrderAmountFrom { get; set; }

        public decimal? OrderAmountTo { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? RequiredDateFrom { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? RequiredDateTo { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? ShippedDateFrom { get; set; }

        [JsonConverter(typeof(RoundDateJsonConverter))]
        public DateTime? ShippedDateTo { get; set; }
    }

    public partial class OrderRepository
    {
        public async Task SaveWholeOrderAsync(Order order)
        {
            if (order.Details == null)
            {
                await base.SaveAsync(order).ConfigureAwait(false);
                return;
            }
            this.DataService.BeginTransaction();
            try
            {
                await base.SaveAsync(order).ConfigureAwait(false);
                foreach (var detail in order.Details)
                {
                    detail.OrderId = order.OrderId;
                }
                var currentDetails = await this.DataService.OrderDetailRepository
                    .Query(OrderDetailProjections.Basic)
                    .Where(nameof(OrderDetail.OrderId), OperatorLite.Equals, order.OrderId)
                    .ToListAsync()
                    .ConfigureAwait(false);
                await this.DataService.OrderDetailRepository.SaveAsync(order.Details, currentDetails).ConfigureAwait(false);
                DataService.Commit();
            }
            catch
            {
                if (this.DataService.IsActiveTransaction) this.DataService.Rollback();
                throw;
            }
        }


        public async Task AddOrderAsync(Order entity)
        {
            this.DataService.BeginTransaction();
            try
            {

                await this.DataService.OrderRepository.InsertAsync(entity);

                foreach (OrderDetail orderDetail in entity.Details)
                {
                    orderDetail.OrderId = entity.OrderId;
                    await this.DataService.OrderDetailRepository.InsertAsync(orderDetail);
                }

                DataService.Commit();
            }
            catch (Exception ex)
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

        public async Task<IList<Order>> GetOrdersByCustIDAsync(string customerId)
        {

            var orders = await this.DataService.OrderRepository
                              .Query(OrderProjections.WithTotal)
                              .Where(nameof(Order.CustomerId), OperatorLite.Equals, customerId)
                              .ToListAsync()
                              .ConfigureAwait(false);

            
            return orders;
        }
        public IQueryLite<Order> SearchQuery(OrderCriteria criteria)
        {
            var query = this.Query(OrderProjections.WithTotal);

            if (criteria.CustomerIds != null && criteria.CustomerIds.Count > 0)
            {
                query.Where(nameof(Order.CustomerId), OperatorLite.In, criteria.CustomerIds);
            }

            if (criteria.EmployeeIds != null && criteria.EmployeeIds.Count > 0)
            {
                query.Where(nameof(Order.EmployeeId), OperatorLite.In, criteria.EmployeeIds);
            }

            if(criteria.ShipperIds != null && criteria.ShipperIds.Count > 0)
            {
                query.Where(nameof(Shipper.ShipperId), OperatorLite.In, criteria.ShipperIds);
            }

            if(criteria.ProductIds != null && criteria.ProductIds.Count > 0)
            {
                IQueryLite<OrderDetail> orderDetailSubQuery = DataService.OrderDetailRepository.Query(OrderDetailProjections.BaseTable)
                                                             .Fields(FieldsOption.None, nameof(OrderDetailFields.OrderId))
                                                              .Where(nameof(OrderDetailFields.ProductId),OperatorLite.In, criteria.ProductIds);

                query.Where(nameof(Order.OrderId), OperatorLite.In, orderDetailSubQuery);
            }

            if (criteria.OrderId.HasValue)
            {
                query.Where(nameof(Order.OrderId), OperatorLite.Equals, criteria.OrderId);
            }

            if (criteria.RequiredDateFrom.HasValue)
            {
                query.Where(nameof(Order.RequiredDate), OperatorLite.GreaterOrEquals, criteria.RequiredDateFrom);
            }
            if (criteria.RequiredDateTo.HasValue)
            {
                query.Where(nameof(Order.RequiredDate), OperatorLite.LessOrEquals, criteria.RequiredDateTo);
            }

            if (criteria.OrderDateFrom.HasValue)
            {
                query.Where(nameof(Order.OrderDate), OperatorLite.GreaterOrEquals, criteria.OrderDateFrom.Value);
            }

            if (criteria.OrderDateTo.HasValue)
            {
                query.Where(nameof(Order.OrderDate), OperatorLite.LessOrEquals, criteria.OrderDateTo.Value);
            }
            if (criteria.OrderAmountFrom.HasValue)
            {
                query.Where(nameof(Order.OrderTotal), OperatorLite.GreaterOrEquals, criteria.OrderAmountFrom);
            }
            if (criteria.OrderAmountTo.HasValue)
            {
                query.Where(nameof(Order.OrderTotal), OperatorLite.LessOrEquals, criteria.OrderAmountFrom);
            }

            return query;

        }
    }
}
