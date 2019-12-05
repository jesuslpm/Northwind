using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Northwind.Web
{
    public static class Extensions
    {
        public static void MapSwaggerJson(this IApplicationBuilder app)
        {
            app.Map("/swagger/v1/swagger.json", appBuilder =>
            {
                appBuilder.Run(async httpContext =>
                {
                    using (var swaggerJsonStream = Assembly.GetExecutingAssembly().GetManifestResourceStream("Northwind.Web.swagger.json"))
                    {
                        httpContext.Response.ContentType = "application/json";
                        await swaggerJsonStream.CopyToAsync(httpContext.Response.Body);
                    }
                });
            });
        }
    }
}
