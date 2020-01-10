using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Northwind.Entities
{
    public partial class  Employee
    {
        [DataMember]
        public string EmployeeFullName => FirstName + " " + LastName;
    }

    public class EmployeeMinimal
    {
        public int EmployeeId { get; set; }
        public string EmployeeFullName { get; set; }
    }
}
