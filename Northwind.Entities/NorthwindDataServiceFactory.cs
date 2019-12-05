using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Northwind.Entities
{
    public interface INorthwindDataServiceFactory
    {
        NorthwindDataService Create();
        NorthwindDataService Create(IServiceProvider serviceProvider);
    }


    public class NorthwindDataServiceFactory : INorthwindDataServiceFactory
    {
        private readonly string connectionString;
        private readonly IServiceProvider serviceProvider;

        public NorthwindDataServiceFactory(IServiceProvider serviceProvider)
        {
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            this.connectionString = configuration.GetConnectionString("Northwind");
          
            this.serviceProvider = serviceProvider;
        }

        public NorthwindDataService Create(IServiceProvider serviceProvider)
        {
            var ds = new NorthwindDataService(this.connectionString, "System.Data.SqlClient");
            ds.IsPreventingSuperfluousUpdatesEnabled = false;
            return ds;
        }

        public NorthwindDataService Create()
        {
            var ds = new NorthwindDataService(this.connectionString, "System.Data.SqlClient");
            ds.IsPreventingSuperfluousUpdatesEnabled = false;
            ds.CurrentUserId = -1;
            return ds;
        }
    }
}
