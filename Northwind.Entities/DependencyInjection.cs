using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Northwind.Entities
{
    public static class DependencyInjection
    {
        public static void AddDataService(this IServiceCollection services)
        {
            services.AddSingleton<INorthwindDataServiceFactory>(serviceProvider => new NorthwindDataServiceFactory(serviceProvider));
            services.AddScoped(serviceProvider => serviceProvider.GetRequiredService<INorthwindDataServiceFactory>().Create(serviceProvider));
        }
    }
}
