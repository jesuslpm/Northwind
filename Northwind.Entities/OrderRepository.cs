using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using inercya.EntityLite;

namespace Northwind.Entities
{

    public class OrderCriteria
    {
        public ICollection<string> CustomerIds { get; set; }

        public int? OrderId { get; set; }
        public DateTime? OrderDateFrom { get; set; } 
        public DateTime? OrderDateTo { get; set; }
        public ICollection<int?> EmployeeIds { get; set; }

        public ICollection<int?> ShipperIds { get; set; }

        public ICollection<int?> ProductIds { get; set; }

        public decimal? OrderAmountFrom { get; set; }

        public decimal? OrderAmountTo { get; set; }

        public DateTime? RequiredDateFrom { get; set; }
        public DateTime? RequiredDateTo { get; set; }

        public DateTime? ShippedDateFrom { get; set; }

        public DateTime? ShippedDateTo { get; set; }
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
