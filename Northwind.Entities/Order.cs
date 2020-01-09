using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Northwind.Entities
{
    public partial class Order
    {
        [DataMember]
        public IList<OrderDetail> Details { get; set; }

        [DataMember]
        public string EmployeeFullName => EmployeeFirstName + " " + EmployeeLastName;
    }
}
