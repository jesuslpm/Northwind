
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
// using Microsoft.SqlServer.Types;
using System.Runtime.Serialization;

using System.ComponentModel;
using inercya.EntityLite;	
using inercya.EntityLite.Extensions;	

namespace Northwind.Entities
{
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Products")]
	public partial class Product
	{
		private Int32 _productId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="ProductID", BaseColumnName ="ProductID", BaseTableName = "Products" )]		
		public Int32 ProductId 
		{ 
		    get { return _productId; } 
			set 
			{
			    _productId = value;
			}
        }

		private String _productName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="ProductName", BaseColumnName ="ProductName", BaseTableName = "Products" )]		
		public String ProductName 
		{ 
		    get { return _productName; } 
			set 
			{
			    _productName = value;
			}
        }

		private Int32? _supplierId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="SupplierID", BaseColumnName ="SupplierID", BaseTableName = "Products" )]		
		public Int32? SupplierId 
		{ 
		    get { return _supplierId; } 
			set 
			{
			    _supplierId = value;
			}
        }

		private Int32? _categoryId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="CategoryID", BaseColumnName ="CategoryID", BaseTableName = "Products" )]		
		public Int32? CategoryId 
		{ 
		    get { return _categoryId; } 
			set 
			{
			    _categoryId = value;
			}
        }

		private String _quantityPerUnit;
		[DataMember]
		[SqlField(DbType.String, 20, ColumnName ="QuantityPerUnit", BaseColumnName ="QuantityPerUnit", BaseTableName = "Products" )]		
		public String QuantityPerUnit 
		{ 
		    get { return _quantityPerUnit; } 
			set 
			{
			    _quantityPerUnit = value;
			}
        }

		private Decimal? _unitPrice;
		[DataMember]
		[SqlField(DbType.Currency, 8, Precision = 19, AllowNull = true, ColumnName ="UnitPrice", BaseColumnName ="UnitPrice", BaseTableName = "Products" )]		
		public Decimal? UnitPrice 
		{ 
		    get { return _unitPrice; } 
			set 
			{
			    _unitPrice = value;
			}
        }

		private Int16? _unitsInStock;
		[DataMember]
		[SqlField(DbType.Int16, 2, Precision = 5, AllowNull = true, ColumnName ="UnitsInStock", BaseColumnName ="UnitsInStock", BaseTableName = "Products" )]		
		public Int16? UnitsInStock 
		{ 
		    get { return _unitsInStock; } 
			set 
			{
			    _unitsInStock = value;
			}
        }

		private Int16? _unitsOnOrder;
		[DataMember]
		[SqlField(DbType.Int16, 2, Precision = 5, AllowNull = true, ColumnName ="UnitsOnOrder", BaseColumnName ="UnitsOnOrder", BaseTableName = "Products" )]		
		public Int16? UnitsOnOrder 
		{ 
		    get { return _unitsOnOrder; } 
			set 
			{
			    _unitsOnOrder = value;
			}
        }

		private Int16? _reorderLevel;
		[DataMember]
		[SqlField(DbType.Int16, 2, Precision = 5, AllowNull = true, ColumnName ="ReorderLevel", BaseColumnName ="ReorderLevel", BaseTableName = "Products" )]		
		public Int16? ReorderLevel 
		{ 
		    get { return _reorderLevel; } 
			set 
			{
			    _reorderLevel = value;
			}
        }

		private Boolean _discontinued;
		[DataMember]
		[SqlField(DbType.Boolean, 1, ColumnName ="Discontinued", BaseColumnName ="Discontinued", BaseTableName = "Products" )]		
		public Boolean Discontinued 
		{ 
		    get { return _discontinued; } 
			set 
			{
			    _discontinued = value;
			}
        }

		private Int32? _totalSold;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="TotalSold" )]		
		public Int32? TotalSold 
		{ 
		    get { return _totalSold; } 
			set 
			{
			    _totalSold = value;
			}
        }

		private Int32? _usaSold;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="USASold" )]		
		public Int32? UsaSold 
		{ 
		    get { return _usaSold; } 
			set 
			{
			    _usaSold = value;
			}
        }

		private Int32? _otherCountrySold;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="OtherCountrySold" )]		
		public Int32? OtherCountrySold 
		{ 
		    get { return _otherCountrySold; } 
			set 
			{
			    _otherCountrySold = value;
			}
        }

		private String _categoryName;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="CategoryName" )]		
		public String CategoryName 
		{ 
		    get { return _categoryName; } 
			set 
			{
			    _categoryName = value;
			}
        }

		private String _suplierName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="SuplierName" )]		
		public String SuplierName 
		{ 
		    get { return _suplierName; } 
			set 
			{
			    _suplierName = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[ProductID], [ProductName], [SupplierID], [CategoryID], [QuantityPerUnit], [UnitPrice], [UnitsInStock], [UnitsOnOrder], [ReorderLevel], [Discontinued]";
		public const string BasicProjectionColumnList = "[ProductID], [ProductName], [SupplierID], [CategoryID], [QuantityPerUnit], [UnitPrice], [UnitsInStock], [UnitsOnOrder], [ReorderLevel], [Discontinued], [TotalSold], [USASold], [OtherCountrySold], [CategoryName], [SuplierName]";

	}

	public partial class ProductRepository : Repository<Product> 
	{
		public ProductRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Product Get(string projectionName, Int32 productId)
		{
			return ((IRepository<Product>)this).Get(projectionName, productId, FetchMode.UseIdentityMap);
		}

		public Product Get(string projectionName, Int32 productId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Product>)this).Get(projectionName, productId, fetchMode);
		}

		public Product Get(Projection projection, Int32 productId)
		{
			return ((IRepository<Product>)this).Get(projection, productId, FetchMode.UseIdentityMap);
		}

		public Product Get(Projection projection, Int32 productId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Product>)this).Get(projection, productId, fetchMode);
		}

		public Product Get(string projectionName, Int32 productId, params string[] fields)
		{
			return ((IRepository<Product>)this).Get(projectionName, productId, fields);
		}

		public Product Get(Projection projection, Int32 productId, params string[] fields)
		{
			return ((IRepository<Product>)this).Get(projection, productId, fields);
		}

		public bool Delete(Int32 productId)
		{
			var entity = new Product { ProductId = productId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Product> GetAsync(string projectionName, Int32 productId)
		{
			return ((IRepository<Product>)this).GetAsync(projectionName, productId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Product> GetAsync(string projectionName, Int32 productId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Product>)this).GetAsync(projectionName, productId, fetchMode);
		}

		public System.Threading.Tasks.Task<Product> GetAsync(Projection projection, Int32 productId)
		{
			return ((IRepository<Product>)this).GetAsync(projection, productId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Product> GetAsync(Projection projection, Int32 productId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Product>)this).GetAsync(projection, productId, fetchMode);
		}

		public System.Threading.Tasks.Task<Product> GetAsync(string projectionName, Int32 productId, params string[] fields)
		{
			return ((IRepository<Product>)this).GetAsync(projectionName, productId, fields);
		}

		public System.Threading.Tasks.Task<Product> GetAsync(Projection projection, Int32 productId, params string[] fields)
		{
			return ((IRepository<Product>)this).GetAsync(projection, productId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 productId)
		{
			var entity = new Product { ProductId = productId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class ProductFields
	{
		public const string ProductId = "ProductId";
		public const string ProductName = "ProductName";
		public const string SupplierId = "SupplierId";
		public const string CategoryId = "CategoryId";
		public const string QuantityPerUnit = "QuantityPerUnit";
		public const string UnitPrice = "UnitPrice";
		public const string UnitsInStock = "UnitsInStock";
		public const string UnitsOnOrder = "UnitsOnOrder";
		public const string ReorderLevel = "ReorderLevel";
		public const string Discontinued = "Discontinued";
		public const string TotalSold = "TotalSold";
		public const string UsaSold = "UsaSold";
		public const string OtherCountrySold = "OtherCountrySold";
		public const string CategoryName = "CategoryName";
		public const string SuplierName = "SuplierName";
	}

	public static partial class ProductProjections
	{
		public const string BaseTable = "BaseTable";
		public const string Basic = "Basic";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Orders")]
	public partial class Order
	{
		private Int32 _orderId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="OrderID", BaseColumnName ="OrderID", BaseTableName = "Orders" )]		
		public Int32 OrderId 
		{ 
		    get { return _orderId; } 
			set 
			{
			    _orderId = value;
			}
        }

		private String _customerId;
		[DataMember]
		[SqlField(DbType.StringFixedLength, 5, ColumnName ="CustomerID", BaseColumnName ="CustomerID", BaseTableName = "Orders" )]		
		public String CustomerId 
		{ 
		    get { return _customerId; } 
			set 
			{
			    _customerId = value;
			}
        }

		private Int32? _employeeId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="EmployeeID", BaseColumnName ="EmployeeID", BaseTableName = "Orders" )]		
		public Int32? EmployeeId 
		{ 
		    get { return _employeeId; } 
			set 
			{
			    _employeeId = value;
			}
        }

		private DateTime? _orderDate;
		[DataMember]
		[Newtonsoft.Json.JsonConverter(typeof(RoundDateJsonConverter))]
		[SqlField(DbType.DateTime, 8, Precision = 23, Scale=3, AllowNull = true, ColumnName ="OrderDate", BaseColumnName ="OrderDate", BaseTableName = "Orders" )]		
		public DateTime? OrderDate 
		{ 
		    get { return _orderDate; } 
			set 
			{
			    _orderDate = value;
			}
        }

		private DateTime? _requiredDate;
		[DataMember]
		[Newtonsoft.Json.JsonConverter(typeof(RoundDateJsonConverter))]
		[SqlField(DbType.DateTime, 8, Precision = 23, Scale=3, AllowNull = true, ColumnName ="RequiredDate", BaseColumnName ="RequiredDate", BaseTableName = "Orders" )]		
		public DateTime? RequiredDate 
		{ 
		    get { return _requiredDate; } 
			set 
			{
			    _requiredDate = value;
			}
        }

		private DateTime? _shippedDate;
		[DataMember]
		[Newtonsoft.Json.JsonConverter(typeof(RoundDateJsonConverter))]
		[SqlField(DbType.DateTime, 8, Precision = 23, Scale=3, AllowNull = true, ColumnName ="ShippedDate", BaseColumnName ="ShippedDate", BaseTableName = "Orders" )]		
		public DateTime? ShippedDate 
		{ 
		    get { return _shippedDate; } 
			set 
			{
			    _shippedDate = value;
			}
        }

		private Int32? _shipVia;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="ShipVia", BaseColumnName ="ShipVia", BaseTableName = "Orders" )]		
		public Int32? ShipVia 
		{ 
		    get { return _shipVia; } 
			set 
			{
			    _shipVia = value;
			}
        }

		private Decimal? _freight;
		[DataMember]
		[SqlField(DbType.Currency, 8, Precision = 19, AllowNull = true, ColumnName ="Freight", BaseColumnName ="Freight", BaseTableName = "Orders" )]		
		public Decimal? Freight 
		{ 
		    get { return _freight; } 
			set 
			{
			    _freight = value;
			}
        }

		private String _shipName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="ShipName", BaseColumnName ="ShipName", BaseTableName = "Orders" )]		
		public String ShipName 
		{ 
		    get { return _shipName; } 
			set 
			{
			    _shipName = value;
			}
        }

		private String _shipAddress;
		[DataMember]
		[SqlField(DbType.String, 60, ColumnName ="ShipAddress", BaseColumnName ="ShipAddress", BaseTableName = "Orders" )]		
		public String ShipAddress 
		{ 
		    get { return _shipAddress; } 
			set 
			{
			    _shipAddress = value;
			}
        }

		private String _shipCity;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="ShipCity", BaseColumnName ="ShipCity", BaseTableName = "Orders" )]		
		public String ShipCity 
		{ 
		    get { return _shipCity; } 
			set 
			{
			    _shipCity = value;
			}
        }

		private String _shipRegion;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="ShipRegion", BaseColumnName ="ShipRegion", BaseTableName = "Orders" )]		
		public String ShipRegion 
		{ 
		    get { return _shipRegion; } 
			set 
			{
			    _shipRegion = value;
			}
        }

		private String _shipPostalCode;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="ShipPostalCode", BaseColumnName ="ShipPostalCode", BaseTableName = "Orders" )]		
		public String ShipPostalCode 
		{ 
		    get { return _shipPostalCode; } 
			set 
			{
			    _shipPostalCode = value;
			}
        }

		private String _shipCountry;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="ShipCountry", BaseColumnName ="ShipCountry", BaseTableName = "Orders" )]		
		public String ShipCountry 
		{ 
		    get { return _shipCountry; } 
			set 
			{
			    _shipCountry = value;
			}
        }

		private String _customerCompanyName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="CustomerCompanyName" )]		
		public String CustomerCompanyName 
		{ 
		    get { return _customerCompanyName; } 
			set 
			{
			    _customerCompanyName = value;
			}
        }

		private String _employeeFirstName;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="EmployeeFirstName" )]		
		public String EmployeeFirstName 
		{ 
		    get { return _employeeFirstName; } 
			set 
			{
			    _employeeFirstName = value;
			}
        }

		private String _employeeLastName;
		[DataMember]
		[SqlField(DbType.String, 20, ColumnName ="EmployeeLastName" )]		
		public String EmployeeLastName 
		{ 
		    get { return _employeeLastName; } 
			set 
			{
			    _employeeLastName = value;
			}
        }

		private String _shipperCompanyName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="ShipperCompanyName" )]		
		public String ShipperCompanyName 
		{ 
		    get { return _shipperCompanyName; } 
			set 
			{
			    _shipperCompanyName = value;
			}
        }

		private Double? _orderTotal;
		[DataMember]
		[SqlField(DbType.Double, 8, Precision = 15, AllowNull = true, IsReadOnly = true, ColumnName ="OrderTotal" )]		
		public Double? OrderTotal 
		{ 
		    get { return _orderTotal; } 
			set 
			{
			    _orderTotal = value;
			}
        }

		private String _shipTitle;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="ShipTitle" )]		
		public String ShipTitle 
		{ 
		    get { return _shipTitle; } 
			set 
			{
			    _shipTitle = value;
			}
        }

		private String _shipPhone;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="ShipPhone" )]		
		public String ShipPhone 
		{ 
		    get { return _shipPhone; } 
			set 
			{
			    _shipPhone = value;
			}
        }

		private String _shipFax;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="ShipFax" )]		
		public String ShipFax 
		{ 
		    get { return _shipFax; } 
			set 
			{
			    _shipFax = value;
			}
        }

		private String _customerName;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="CustomerName" )]		
		public String CustomerName 
		{ 
		    get { return _customerName; } 
			set 
			{
			    _customerName = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[OrderID], [CustomerID], [EmployeeID], [OrderDate], [RequiredDate], [ShippedDate], [ShipVia], [Freight], [ShipName], [ShipAddress], [ShipCity], [ShipRegion], [ShipPostalCode], [ShipCountry]";
		public const string BasicProjectionColumnList = "[OrderID], [CustomerID], [EmployeeID], [OrderDate], [RequiredDate], [ShippedDate], [ShipVia], [Freight], [ShipName], [ShipAddress], [ShipCity], [ShipRegion], [ShipPostalCode], [ShipCountry], [CustomerCompanyName], [EmployeeFirstName], [EmployeeLastName], [ShipperCompanyName], [OrderTotal], [ShipTitle], [ShipPhone], [ShipFax]";
		public const string WithTotalProjectionColumnList = "[OrderID], [CustomerID], [EmployeeID], [OrderDate], [RequiredDate], [ShippedDate], [ShipVia], [Freight], [ShipName], [ShipAddress], [ShipCity], [ShipRegion], [ShipPostalCode], [ShipCountry], [CustomerName], [EmployeeFirstName], [EmployeeLastName], [OrderTotal]";

	}

	public partial class OrderRepository : Repository<Order> 
	{
		public OrderRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Order Get(string projectionName, Int32 orderId)
		{
			return ((IRepository<Order>)this).Get(projectionName, orderId, FetchMode.UseIdentityMap);
		}

		public Order Get(string projectionName, Int32 orderId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Order>)this).Get(projectionName, orderId, fetchMode);
		}

		public Order Get(Projection projection, Int32 orderId)
		{
			return ((IRepository<Order>)this).Get(projection, orderId, FetchMode.UseIdentityMap);
		}

		public Order Get(Projection projection, Int32 orderId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Order>)this).Get(projection, orderId, fetchMode);
		}

		public Order Get(string projectionName, Int32 orderId, params string[] fields)
		{
			return ((IRepository<Order>)this).Get(projectionName, orderId, fields);
		}

		public Order Get(Projection projection, Int32 orderId, params string[] fields)
		{
			return ((IRepository<Order>)this).Get(projection, orderId, fields);
		}

		public bool Delete(Int32 orderId)
		{
			var entity = new Order { OrderId = orderId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Order> GetAsync(string projectionName, Int32 orderId)
		{
			return ((IRepository<Order>)this).GetAsync(projectionName, orderId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Order> GetAsync(string projectionName, Int32 orderId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Order>)this).GetAsync(projectionName, orderId, fetchMode);
		}

		public System.Threading.Tasks.Task<Order> GetAsync(Projection projection, Int32 orderId)
		{
			return ((IRepository<Order>)this).GetAsync(projection, orderId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Order> GetAsync(Projection projection, Int32 orderId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Order>)this).GetAsync(projection, orderId, fetchMode);
		}

		public System.Threading.Tasks.Task<Order> GetAsync(string projectionName, Int32 orderId, params string[] fields)
		{
			return ((IRepository<Order>)this).GetAsync(projectionName, orderId, fields);
		}

		public System.Threading.Tasks.Task<Order> GetAsync(Projection projection, Int32 orderId, params string[] fields)
		{
			return ((IRepository<Order>)this).GetAsync(projection, orderId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 orderId)
		{
			var entity = new Order { OrderId = orderId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class OrderFields
	{
		public const string OrderId = "OrderId";
		public const string CustomerId = "CustomerId";
		public const string EmployeeId = "EmployeeId";
		public const string OrderDate = "OrderDate";
		public const string RequiredDate = "RequiredDate";
		public const string ShippedDate = "ShippedDate";
		public const string ShipVia = "ShipVia";
		public const string Freight = "Freight";
		public const string ShipName = "ShipName";
		public const string ShipAddress = "ShipAddress";
		public const string ShipCity = "ShipCity";
		public const string ShipRegion = "ShipRegion";
		public const string ShipPostalCode = "ShipPostalCode";
		public const string ShipCountry = "ShipCountry";
		public const string CustomerCompanyName = "CustomerCompanyName";
		public const string EmployeeFirstName = "EmployeeFirstName";
		public const string EmployeeLastName = "EmployeeLastName";
		public const string ShipperCompanyName = "ShipperCompanyName";
		public const string OrderTotal = "OrderTotal";
		public const string ShipTitle = "ShipTitle";
		public const string ShipPhone = "ShipPhone";
		public const string ShipFax = "ShipFax";
		public const string CustomerName = "CustomerName";
	}

	public static partial class OrderProjections
	{
		public const string BaseTable = "BaseTable";
		public const string Basic = "Basic";
		public const string WithTotal = "WithTotal";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Order Details")]
	public partial class OrderDetail
	{
		private Int32 _orderId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, ColumnName ="OrderID", BaseColumnName ="OrderID", BaseTableName = "Order Details" )]		
		public Int32 OrderId 
		{ 
		    get { return _orderId; } 
			set 
			{
			    _orderId = value;
			}
        }

		private Int32 _productId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, ColumnName ="ProductID", BaseColumnName ="ProductID", BaseTableName = "Order Details" )]		
		public Int32 ProductId 
		{ 
		    get { return _productId; } 
			set 
			{
			    _productId = value;
			}
        }

		private Decimal _unitPrice;
		[DataMember]
		[SqlField(DbType.Currency, 8, Precision = 19, ColumnName ="UnitPrice", BaseColumnName ="UnitPrice", BaseTableName = "Order Details" )]		
		public Decimal UnitPrice 
		{ 
		    get { return _unitPrice; } 
			set 
			{
			    _unitPrice = value;
			}
        }

		private Int16 _quantity;
		[DataMember]
		[SqlField(DbType.Int16, 2, Precision = 5, ColumnName ="Quantity", BaseColumnName ="Quantity", BaseTableName = "Order Details" )]		
		public Int16 Quantity 
		{ 
		    get { return _quantity; } 
			set 
			{
			    _quantity = value;
			}
        }

		private Single _discount;
		[DataMember]
		[SqlField(DbType.Single, 4, Precision = 7, ColumnName ="Discount", BaseColumnName ="Discount", BaseTableName = "Order Details" )]		
		public Single Discount 
		{ 
		    get { return _discount; } 
			set 
			{
			    _discount = value;
			}
        }

		private Int32 _orderDetailId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="OrderDetailID", BaseColumnName ="OrderDetailID", BaseTableName = "Order Details" )]		
		public Int32 OrderDetailId 
		{ 
		    get { return _orderDetailId; } 
			set 
			{
			    _orderDetailId = value;
			}
        }

		private String _productName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="ProductName" )]		
		public String ProductName 
		{ 
		    get { return _productName; } 
			set 
			{
			    _productName = value;
			}
        }

		private Decimal? _lineTotal;
		[DataMember]
		[SqlField(DbType.Currency, 8, Precision = 19, AllowNull = true, IsReadOnly = true, ColumnName ="LineTotal" )]		
		public Decimal? LineTotal 
		{ 
		    get { return _lineTotal; } 
			set 
			{
			    _lineTotal = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[OrderID], [ProductID], [UnitPrice], [Quantity], [Discount], [OrderDetailID]";
		public const string BasicProjectionColumnList = "[OrderDetailID], [OrderID], [ProductID], [UnitPrice], [Quantity], [Discount], [ProductName], [LineTotal]";

	}

	public partial class OrderDetailRepository : Repository<OrderDetail> 
	{
		public OrderDetailRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public OrderDetail Get(string projectionName, Int32 orderDetailId)
		{
			return ((IRepository<OrderDetail>)this).Get(projectionName, orderDetailId, FetchMode.UseIdentityMap);
		}

		public OrderDetail Get(string projectionName, Int32 orderDetailId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<OrderDetail>)this).Get(projectionName, orderDetailId, fetchMode);
		}

		public OrderDetail Get(Projection projection, Int32 orderDetailId)
		{
			return ((IRepository<OrderDetail>)this).Get(projection, orderDetailId, FetchMode.UseIdentityMap);
		}

		public OrderDetail Get(Projection projection, Int32 orderDetailId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<OrderDetail>)this).Get(projection, orderDetailId, fetchMode);
		}

		public OrderDetail Get(string projectionName, Int32 orderDetailId, params string[] fields)
		{
			return ((IRepository<OrderDetail>)this).Get(projectionName, orderDetailId, fields);
		}

		public OrderDetail Get(Projection projection, Int32 orderDetailId, params string[] fields)
		{
			return ((IRepository<OrderDetail>)this).Get(projection, orderDetailId, fields);
		}

		public bool Delete(Int32 orderDetailId)
		{
			var entity = new OrderDetail { OrderDetailId = orderDetailId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(string projectionName, Int32 orderDetailId)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projectionName, orderDetailId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(string projectionName, Int32 orderDetailId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projectionName, orderDetailId, fetchMode);
		}

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(Projection projection, Int32 orderDetailId)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projection, orderDetailId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(Projection projection, Int32 orderDetailId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projection, orderDetailId, fetchMode);
		}

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(string projectionName, Int32 orderDetailId, params string[] fields)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projectionName, orderDetailId, fields);
		}

		public System.Threading.Tasks.Task<OrderDetail> GetAsync(Projection projection, Int32 orderDetailId, params string[] fields)
		{
			return ((IRepository<OrderDetail>)this).GetAsync(projection, orderDetailId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 orderDetailId)
		{
			var entity = new OrderDetail { OrderDetailId = orderDetailId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class OrderDetailFields
	{
		public const string OrderId = "OrderId";
		public const string ProductId = "ProductId";
		public const string UnitPrice = "UnitPrice";
		public const string Quantity = "Quantity";
		public const string Discount = "Discount";
		public const string OrderDetailId = "OrderDetailId";
		public const string ProductName = "ProductName";
		public const string LineTotal = "LineTotal";
	}

	public static partial class OrderDetailProjections
	{
		public const string BaseTable = "BaseTable";
		public const string Basic = "Basic";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Categories")]
	public partial class Category
	{
		private Int32 _categoryId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="CategoryID", BaseColumnName ="CategoryID", BaseTableName = "Categories" )]		
		public Int32 CategoryId 
		{ 
		    get { return _categoryId; } 
			set 
			{
			    _categoryId = value;
			}
        }

		private String _categoryName;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="CategoryName", BaseColumnName ="CategoryName", BaseTableName = "Categories" )]		
		public String CategoryName 
		{ 
		    get { return _categoryName; } 
			set 
			{
			    _categoryName = value;
			}
        }

		private String _description;
		[DataMember]
		[SqlField(DbType.String, 1073741823, ColumnName ="Description", BaseColumnName ="Description", BaseTableName = "Categories" )]		
		public String Description 
		{ 
		    get { return _description; } 
			set 
			{
			    _description = value;
			}
        }

		private Byte[] _picture;
		[DataMember]
		[SqlField(DbType.Binary, 2147483647, ColumnName ="Picture", BaseColumnName ="Picture", BaseTableName = "Categories" )]		
		public Byte[] Picture 
		{ 
		    get { return _picture; } 
			set 
			{
			    _picture = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[CategoryID], [CategoryName], [Description], [Picture]";
		public const string MinimalProjectionColumnList = "[CategoryID], [CategoryName], [Description]";

	}

	public partial class CategoryRepository : Repository<Category> 
	{
		public CategoryRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Category Get(string projectionName, Int32 categoryId)
		{
			return ((IRepository<Category>)this).Get(projectionName, categoryId, FetchMode.UseIdentityMap);
		}

		public Category Get(string projectionName, Int32 categoryId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Category>)this).Get(projectionName, categoryId, fetchMode);
		}

		public Category Get(Projection projection, Int32 categoryId)
		{
			return ((IRepository<Category>)this).Get(projection, categoryId, FetchMode.UseIdentityMap);
		}

		public Category Get(Projection projection, Int32 categoryId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Category>)this).Get(projection, categoryId, fetchMode);
		}

		public Category Get(string projectionName, Int32 categoryId, params string[] fields)
		{
			return ((IRepository<Category>)this).Get(projectionName, categoryId, fields);
		}

		public Category Get(Projection projection, Int32 categoryId, params string[] fields)
		{
			return ((IRepository<Category>)this).Get(projection, categoryId, fields);
		}

		public bool Delete(Int32 categoryId)
		{
			var entity = new Category { CategoryId = categoryId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Category> GetAsync(string projectionName, Int32 categoryId)
		{
			return ((IRepository<Category>)this).GetAsync(projectionName, categoryId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Category> GetAsync(string projectionName, Int32 categoryId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Category>)this).GetAsync(projectionName, categoryId, fetchMode);
		}

		public System.Threading.Tasks.Task<Category> GetAsync(Projection projection, Int32 categoryId)
		{
			return ((IRepository<Category>)this).GetAsync(projection, categoryId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Category> GetAsync(Projection projection, Int32 categoryId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Category>)this).GetAsync(projection, categoryId, fetchMode);
		}

		public System.Threading.Tasks.Task<Category> GetAsync(string projectionName, Int32 categoryId, params string[] fields)
		{
			return ((IRepository<Category>)this).GetAsync(projectionName, categoryId, fields);
		}

		public System.Threading.Tasks.Task<Category> GetAsync(Projection projection, Int32 categoryId, params string[] fields)
		{
			return ((IRepository<Category>)this).GetAsync(projection, categoryId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 categoryId)
		{
			var entity = new Category { CategoryId = categoryId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class CategoryFields
	{
		public const string CategoryId = "CategoryId";
		public const string CategoryName = "CategoryName";
		public const string Description = "Description";
		public const string Picture = "Picture";
	}

	public static partial class CategoryProjections
	{
		public const string BaseTable = "BaseTable";
		public const string Minimal = "Minimal";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Customers")]
	public partial class Customer
	{
		private String _customerId;
		[DataMember]
		[SqlField(DbType.StringFixedLength, 5, IsKey=true, ColumnName ="CustomerID", BaseColumnName ="CustomerID", BaseTableName = "Customers" )]		
		public String CustomerId 
		{ 
		    get { return _customerId; } 
			set 
			{
			    _customerId = value;
			}
        }

		private String _companyName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="CompanyName", BaseColumnName ="CompanyName", BaseTableName = "Customers" )]		
		public String CompanyName 
		{ 
		    get { return _companyName; } 
			set 
			{
			    _companyName = value;
			}
        }

		private String _contactName;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="ContactName", BaseColumnName ="ContactName", BaseTableName = "Customers" )]		
		public String ContactName 
		{ 
		    get { return _contactName; } 
			set 
			{
			    _contactName = value;
			}
        }

		private String _contactTitle;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="ContactTitle", BaseColumnName ="ContactTitle", BaseTableName = "Customers" )]		
		public String ContactTitle 
		{ 
		    get { return _contactTitle; } 
			set 
			{
			    _contactTitle = value;
			}
        }

		private String _address;
		[DataMember]
		[SqlField(DbType.String, 60, ColumnName ="Address", BaseColumnName ="Address", BaseTableName = "Customers" )]		
		public String Address 
		{ 
		    get { return _address; } 
			set 
			{
			    _address = value;
			}
        }

		private String _city;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="City", BaseColumnName ="City", BaseTableName = "Customers" )]		
		public String City 
		{ 
		    get { return _city; } 
			set 
			{
			    _city = value;
			}
        }

		private String _region;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Region", BaseColumnName ="Region", BaseTableName = "Customers" )]		
		public String Region 
		{ 
		    get { return _region; } 
			set 
			{
			    _region = value;
			}
        }

		private String _postalCode;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="PostalCode", BaseColumnName ="PostalCode", BaseTableName = "Customers" )]		
		public String PostalCode 
		{ 
		    get { return _postalCode; } 
			set 
			{
			    _postalCode = value;
			}
        }

		private String _country;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Country", BaseColumnName ="Country", BaseTableName = "Customers" )]		
		public String Country 
		{ 
		    get { return _country; } 
			set 
			{
			    _country = value;
			}
        }

		private String _phone;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="Phone", BaseColumnName ="Phone", BaseTableName = "Customers" )]		
		public String Phone 
		{ 
		    get { return _phone; } 
			set 
			{
			    _phone = value;
			}
        }

		private String _fax;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="Fax", BaseColumnName ="Fax", BaseTableName = "Customers" )]		
		public String Fax 
		{ 
		    get { return _fax; } 
			set 
			{
			    _fax = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[CustomerID], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country], [Phone], [Fax]";

	}

	public partial class CustomerRepository : Repository<Customer> 
	{
		public CustomerRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Customer Get(string projectionName, String customerId)
		{
			return ((IRepository<Customer>)this).Get(projectionName, customerId, FetchMode.UseIdentityMap);
		}

		public Customer Get(string projectionName, String customerId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Customer>)this).Get(projectionName, customerId, fetchMode);
		}

		public Customer Get(Projection projection, String customerId)
		{
			return ((IRepository<Customer>)this).Get(projection, customerId, FetchMode.UseIdentityMap);
		}

		public Customer Get(Projection projection, String customerId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Customer>)this).Get(projection, customerId, fetchMode);
		}

		public Customer Get(string projectionName, String customerId, params string[] fields)
		{
			return ((IRepository<Customer>)this).Get(projectionName, customerId, fields);
		}

		public Customer Get(Projection projection, String customerId, params string[] fields)
		{
			return ((IRepository<Customer>)this).Get(projection, customerId, fields);
		}

		public bool Delete(String customerId)
		{
			var entity = new Customer { CustomerId = customerId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Customer> GetAsync(string projectionName, String customerId)
		{
			return ((IRepository<Customer>)this).GetAsync(projectionName, customerId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Customer> GetAsync(string projectionName, String customerId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Customer>)this).GetAsync(projectionName, customerId, fetchMode);
		}

		public System.Threading.Tasks.Task<Customer> GetAsync(Projection projection, String customerId)
		{
			return ((IRepository<Customer>)this).GetAsync(projection, customerId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Customer> GetAsync(Projection projection, String customerId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Customer>)this).GetAsync(projection, customerId, fetchMode);
		}

		public System.Threading.Tasks.Task<Customer> GetAsync(string projectionName, String customerId, params string[] fields)
		{
			return ((IRepository<Customer>)this).GetAsync(projectionName, customerId, fields);
		}

		public System.Threading.Tasks.Task<Customer> GetAsync(Projection projection, String customerId, params string[] fields)
		{
			return ((IRepository<Customer>)this).GetAsync(projection, customerId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(String customerId)
		{
			var entity = new Customer { CustomerId = customerId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class CustomerFields
	{
		public const string CustomerId = "CustomerId";
		public const string CompanyName = "CompanyName";
		public const string ContactName = "ContactName";
		public const string ContactTitle = "ContactTitle";
		public const string Address = "Address";
		public const string City = "City";
		public const string Region = "Region";
		public const string PostalCode = "PostalCode";
		public const string Country = "Country";
		public const string Phone = "Phone";
		public const string Fax = "Fax";
	}

	public static partial class CustomerProjections
	{
		public const string BaseTable = "BaseTable";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Employees")]
	public partial class Employee
	{
		private Int32 _employeeId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="EmployeeID", BaseColumnName ="EmployeeID", BaseTableName = "Employees" )]		
		public Int32 EmployeeId 
		{ 
		    get { return _employeeId; } 
			set 
			{
			    _employeeId = value;
			}
        }

		private String _lastName;
		[DataMember]
		[SqlField(DbType.String, 20, ColumnName ="LastName", BaseColumnName ="LastName", BaseTableName = "Employees" )]		
		public String LastName 
		{ 
		    get { return _lastName; } 
			set 
			{
			    _lastName = value;
			}
        }

		private String _firstName;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="FirstName", BaseColumnName ="FirstName", BaseTableName = "Employees" )]		
		public String FirstName 
		{ 
		    get { return _firstName; } 
			set 
			{
			    _firstName = value;
			}
        }

		private String _title;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="Title", BaseColumnName ="Title", BaseTableName = "Employees" )]		
		public String Title 
		{ 
		    get { return _title; } 
			set 
			{
			    _title = value;
			}
        }

		private String _titleOfCourtesy;
		[DataMember]
		[SqlField(DbType.String, 25, ColumnName ="TitleOfCourtesy", BaseColumnName ="TitleOfCourtesy", BaseTableName = "Employees" )]		
		public String TitleOfCourtesy 
		{ 
		    get { return _titleOfCourtesy; } 
			set 
			{
			    _titleOfCourtesy = value;
			}
        }

		private DateTime? _birthDate;
		[DataMember]
		[SqlField(DbType.DateTime, 8, Precision = 23, Scale=3, AllowNull = true, ColumnName ="BirthDate", BaseColumnName ="BirthDate", BaseTableName = "Employees" )]		
		public DateTime? BirthDate 
		{ 
		    get { return _birthDate; } 
			set 
			{
			    _birthDate = value;
			}
        }

		private DateTime? _hireDate;
		[DataMember]
		[SqlField(DbType.DateTime, 8, Precision = 23, Scale=3, AllowNull = true, ColumnName ="HireDate", BaseColumnName ="HireDate", BaseTableName = "Employees" )]		
		public DateTime? HireDate 
		{ 
		    get { return _hireDate; } 
			set 
			{
			    _hireDate = value;
			}
        }

		private String _address;
		[DataMember]
		[SqlField(DbType.String, 60, ColumnName ="Address", BaseColumnName ="Address", BaseTableName = "Employees" )]		
		public String Address 
		{ 
		    get { return _address; } 
			set 
			{
			    _address = value;
			}
        }

		private String _city;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="City", BaseColumnName ="City", BaseTableName = "Employees" )]		
		public String City 
		{ 
		    get { return _city; } 
			set 
			{
			    _city = value;
			}
        }

		private String _region;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Region", BaseColumnName ="Region", BaseTableName = "Employees" )]		
		public String Region 
		{ 
		    get { return _region; } 
			set 
			{
			    _region = value;
			}
        }

		private String _postalCode;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="PostalCode", BaseColumnName ="PostalCode", BaseTableName = "Employees" )]		
		public String PostalCode 
		{ 
		    get { return _postalCode; } 
			set 
			{
			    _postalCode = value;
			}
        }

		private String _country;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Country", BaseColumnName ="Country", BaseTableName = "Employees" )]		
		public String Country 
		{ 
		    get { return _country; } 
			set 
			{
			    _country = value;
			}
        }

		private String _homePhone;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="HomePhone", BaseColumnName ="HomePhone", BaseTableName = "Employees" )]		
		public String HomePhone 
		{ 
		    get { return _homePhone; } 
			set 
			{
			    _homePhone = value;
			}
        }

		private String _extension;
		[DataMember]
		[SqlField(DbType.String, 4, ColumnName ="Extension", BaseColumnName ="Extension", BaseTableName = "Employees" )]		
		public String Extension 
		{ 
		    get { return _extension; } 
			set 
			{
			    _extension = value;
			}
        }

		private Byte[] _photo;
		[DataMember]
		[SqlField(DbType.Binary, 2147483647, ColumnName ="Photo", BaseColumnName ="Photo", BaseTableName = "Employees" )]		
		public Byte[] Photo 
		{ 
		    get { return _photo; } 
			set 
			{
			    _photo = value;
			}
        }

		private String _notes;
		[DataMember]
		[SqlField(DbType.String, 1073741823, ColumnName ="Notes", BaseColumnName ="Notes", BaseTableName = "Employees" )]		
		public String Notes 
		{ 
		    get { return _notes; } 
			set 
			{
			    _notes = value;
			}
        }

		private Int32? _reportsTo;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, AllowNull = true, ColumnName ="ReportsTo", BaseColumnName ="ReportsTo", BaseTableName = "Employees" )]		
		public Int32? ReportsTo 
		{ 
		    get { return _reportsTo; } 
			set 
			{
			    _reportsTo = value;
			}
        }

		private String _photoPath;
		[DataMember]
		[SqlField(DbType.String, 255, ColumnName ="PhotoPath", BaseColumnName ="PhotoPath", BaseTableName = "Employees" )]		
		public String PhotoPath 
		{ 
		    get { return _photoPath; } 
			set 
			{
			    _photoPath = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[EmployeeID], [LastName], [FirstName], [Title], [TitleOfCourtesy], [BirthDate], [HireDate], [Address], [City], [Region], [PostalCode], [Country], [HomePhone], [Extension], [Photo], [Notes], [ReportsTo], [PhotoPath]";
		public const string MinimalProjectionColumnList = "[EmployeeID], [FirstName], [LastName]";

	}

	public partial class EmployeeRepository : Repository<Employee> 
	{
		public EmployeeRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Employee Get(string projectionName, Int32 employeeId)
		{
			return ((IRepository<Employee>)this).Get(projectionName, employeeId, FetchMode.UseIdentityMap);
		}

		public Employee Get(string projectionName, Int32 employeeId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Employee>)this).Get(projectionName, employeeId, fetchMode);
		}

		public Employee Get(Projection projection, Int32 employeeId)
		{
			return ((IRepository<Employee>)this).Get(projection, employeeId, FetchMode.UseIdentityMap);
		}

		public Employee Get(Projection projection, Int32 employeeId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Employee>)this).Get(projection, employeeId, fetchMode);
		}

		public Employee Get(string projectionName, Int32 employeeId, params string[] fields)
		{
			return ((IRepository<Employee>)this).Get(projectionName, employeeId, fields);
		}

		public Employee Get(Projection projection, Int32 employeeId, params string[] fields)
		{
			return ((IRepository<Employee>)this).Get(projection, employeeId, fields);
		}

		public bool Delete(Int32 employeeId)
		{
			var entity = new Employee { EmployeeId = employeeId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Employee> GetAsync(string projectionName, Int32 employeeId)
		{
			return ((IRepository<Employee>)this).GetAsync(projectionName, employeeId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Employee> GetAsync(string projectionName, Int32 employeeId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Employee>)this).GetAsync(projectionName, employeeId, fetchMode);
		}

		public System.Threading.Tasks.Task<Employee> GetAsync(Projection projection, Int32 employeeId)
		{
			return ((IRepository<Employee>)this).GetAsync(projection, employeeId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Employee> GetAsync(Projection projection, Int32 employeeId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Employee>)this).GetAsync(projection, employeeId, fetchMode);
		}

		public System.Threading.Tasks.Task<Employee> GetAsync(string projectionName, Int32 employeeId, params string[] fields)
		{
			return ((IRepository<Employee>)this).GetAsync(projectionName, employeeId, fields);
		}

		public System.Threading.Tasks.Task<Employee> GetAsync(Projection projection, Int32 employeeId, params string[] fields)
		{
			return ((IRepository<Employee>)this).GetAsync(projection, employeeId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 employeeId)
		{
			var entity = new Employee { EmployeeId = employeeId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class EmployeeFields
	{
		public const string EmployeeId = "EmployeeId";
		public const string LastName = "LastName";
		public const string FirstName = "FirstName";
		public const string Title = "Title";
		public const string TitleOfCourtesy = "TitleOfCourtesy";
		public const string BirthDate = "BirthDate";
		public const string HireDate = "HireDate";
		public const string Address = "Address";
		public const string City = "City";
		public const string Region = "Region";
		public const string PostalCode = "PostalCode";
		public const string Country = "Country";
		public const string HomePhone = "HomePhone";
		public const string Extension = "Extension";
		public const string Photo = "Photo";
		public const string Notes = "Notes";
		public const string ReportsTo = "ReportsTo";
		public const string PhotoPath = "PhotoPath";
	}

	public static partial class EmployeeProjections
	{
		public const string BaseTable = "BaseTable";
		public const string Minimal = "Minimal";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Shippers")]
	public partial class Shipper
	{
		private Int32 _shipperId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="ShipperID", BaseColumnName ="ShipperID", BaseTableName = "Shippers" )]		
		public Int32 ShipperId 
		{ 
		    get { return _shipperId; } 
			set 
			{
			    _shipperId = value;
			}
        }

		private String _companyName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="CompanyName", BaseColumnName ="CompanyName", BaseTableName = "Shippers" )]		
		public String CompanyName 
		{ 
		    get { return _companyName; } 
			set 
			{
			    _companyName = value;
			}
        }

		private String _phone;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="Phone", BaseColumnName ="Phone", BaseTableName = "Shippers" )]		
		public String Phone 
		{ 
		    get { return _phone; } 
			set 
			{
			    _phone = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[ShipperID], [CompanyName], [Phone]";

	}

	public partial class ShipperRepository : Repository<Shipper> 
	{
		public ShipperRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Shipper Get(string projectionName, Int32 shipperId)
		{
			return ((IRepository<Shipper>)this).Get(projectionName, shipperId, FetchMode.UseIdentityMap);
		}

		public Shipper Get(string projectionName, Int32 shipperId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Shipper>)this).Get(projectionName, shipperId, fetchMode);
		}

		public Shipper Get(Projection projection, Int32 shipperId)
		{
			return ((IRepository<Shipper>)this).Get(projection, shipperId, FetchMode.UseIdentityMap);
		}

		public Shipper Get(Projection projection, Int32 shipperId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Shipper>)this).Get(projection, shipperId, fetchMode);
		}

		public Shipper Get(string projectionName, Int32 shipperId, params string[] fields)
		{
			return ((IRepository<Shipper>)this).Get(projectionName, shipperId, fields);
		}

		public Shipper Get(Projection projection, Int32 shipperId, params string[] fields)
		{
			return ((IRepository<Shipper>)this).Get(projection, shipperId, fields);
		}

		public bool Delete(Int32 shipperId)
		{
			var entity = new Shipper { ShipperId = shipperId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Shipper> GetAsync(string projectionName, Int32 shipperId)
		{
			return ((IRepository<Shipper>)this).GetAsync(projectionName, shipperId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Shipper> GetAsync(string projectionName, Int32 shipperId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Shipper>)this).GetAsync(projectionName, shipperId, fetchMode);
		}

		public System.Threading.Tasks.Task<Shipper> GetAsync(Projection projection, Int32 shipperId)
		{
			return ((IRepository<Shipper>)this).GetAsync(projection, shipperId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Shipper> GetAsync(Projection projection, Int32 shipperId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Shipper>)this).GetAsync(projection, shipperId, fetchMode);
		}

		public System.Threading.Tasks.Task<Shipper> GetAsync(string projectionName, Int32 shipperId, params string[] fields)
		{
			return ((IRepository<Shipper>)this).GetAsync(projectionName, shipperId, fields);
		}

		public System.Threading.Tasks.Task<Shipper> GetAsync(Projection projection, Int32 shipperId, params string[] fields)
		{
			return ((IRepository<Shipper>)this).GetAsync(projection, shipperId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 shipperId)
		{
			var entity = new Shipper { ShipperId = shipperId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class ShipperFields
	{
		public const string ShipperId = "ShipperId";
		public const string CompanyName = "CompanyName";
		public const string Phone = "Phone";
	}

	public static partial class ShipperProjections
	{
		public const string BaseTable = "BaseTable";
	}
	[Serializable]
	[DataContract]
	[SqlEntity(BaseTableName="Suppliers")]
	public partial class Supplier
	{
		private Int32 _supplierId;
		[DataMember]
		[SqlField(DbType.Int32, 4, Precision = 10, IsKey=true, IsAutoincrement=true, IsReadOnly = true, ColumnName ="SupplierID", BaseColumnName ="SupplierID", BaseTableName = "Suppliers" )]		
		public Int32 SupplierId 
		{ 
		    get { return _supplierId; } 
			set 
			{
			    _supplierId = value;
			}
        }

		private String _companyName;
		[DataMember]
		[SqlField(DbType.String, 40, ColumnName ="CompanyName", BaseColumnName ="CompanyName", BaseTableName = "Suppliers" )]		
		public String CompanyName 
		{ 
		    get { return _companyName; } 
			set 
			{
			    _companyName = value;
			}
        }

		private String _contactName;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="ContactName", BaseColumnName ="ContactName", BaseTableName = "Suppliers" )]		
		public String ContactName 
		{ 
		    get { return _contactName; } 
			set 
			{
			    _contactName = value;
			}
        }

		private String _contactTitle;
		[DataMember]
		[SqlField(DbType.String, 30, ColumnName ="ContactTitle", BaseColumnName ="ContactTitle", BaseTableName = "Suppliers" )]		
		public String ContactTitle 
		{ 
		    get { return _contactTitle; } 
			set 
			{
			    _contactTitle = value;
			}
        }

		private String _address;
		[DataMember]
		[SqlField(DbType.String, 60, ColumnName ="Address", BaseColumnName ="Address", BaseTableName = "Suppliers" )]		
		public String Address 
		{ 
		    get { return _address; } 
			set 
			{
			    _address = value;
			}
        }

		private String _city;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="City", BaseColumnName ="City", BaseTableName = "Suppliers" )]		
		public String City 
		{ 
		    get { return _city; } 
			set 
			{
			    _city = value;
			}
        }

		private String _region;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Region", BaseColumnName ="Region", BaseTableName = "Suppliers" )]		
		public String Region 
		{ 
		    get { return _region; } 
			set 
			{
			    _region = value;
			}
        }

		private String _postalCode;
		[DataMember]
		[SqlField(DbType.String, 10, ColumnName ="PostalCode", BaseColumnName ="PostalCode", BaseTableName = "Suppliers" )]		
		public String PostalCode 
		{ 
		    get { return _postalCode; } 
			set 
			{
			    _postalCode = value;
			}
        }

		private String _country;
		[DataMember]
		[SqlField(DbType.String, 15, ColumnName ="Country", BaseColumnName ="Country", BaseTableName = "Suppliers" )]		
		public String Country 
		{ 
		    get { return _country; } 
			set 
			{
			    _country = value;
			}
        }

		private String _phone;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="Phone", BaseColumnName ="Phone", BaseTableName = "Suppliers" )]		
		public String Phone 
		{ 
		    get { return _phone; } 
			set 
			{
			    _phone = value;
			}
        }

		private String _fax;
		[DataMember]
		[SqlField(DbType.String, 24, ColumnName ="Fax", BaseColumnName ="Fax", BaseTableName = "Suppliers" )]		
		public String Fax 
		{ 
		    get { return _fax; } 
			set 
			{
			    _fax = value;
			}
        }

		private String _homePage;
		[DataMember]
		[SqlField(DbType.String, 1073741823, ColumnName ="HomePage", BaseColumnName ="HomePage", BaseTableName = "Suppliers" )]		
		public String HomePage 
		{ 
		    get { return _homePage; } 
			set 
			{
			    _homePage = value;
			}
        }

		public const string BaseTableProjectionColumnList = "[SupplierID], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country], [Phone], [Fax], [HomePage]";

	}

	public partial class SupplierRepository : Repository<Supplier> 
	{
		public SupplierRepository(DataService DataService) : base(DataService)
		{
		}

		public new NorthwindDataService  DataService  
		{
			get { return (NorthwindDataService) base.DataService; }
			set { base.DataService = value; }
		}

		public Supplier Get(string projectionName, Int32 supplierId)
		{
			return ((IRepository<Supplier>)this).Get(projectionName, supplierId, FetchMode.UseIdentityMap);
		}

		public Supplier Get(string projectionName, Int32 supplierId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Supplier>)this).Get(projectionName, supplierId, fetchMode);
		}

		public Supplier Get(Projection projection, Int32 supplierId)
		{
			return ((IRepository<Supplier>)this).Get(projection, supplierId, FetchMode.UseIdentityMap);
		}

		public Supplier Get(Projection projection, Int32 supplierId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Supplier>)this).Get(projection, supplierId, fetchMode);
		}

		public Supplier Get(string projectionName, Int32 supplierId, params string[] fields)
		{
			return ((IRepository<Supplier>)this).Get(projectionName, supplierId, fields);
		}

		public Supplier Get(Projection projection, Int32 supplierId, params string[] fields)
		{
			return ((IRepository<Supplier>)this).Get(projection, supplierId, fields);
		}

		public bool Delete(Int32 supplierId)
		{
			var entity = new Supplier { SupplierId = supplierId };
			return this.Delete(entity);
		}

				// asyncrhonous methods

		public System.Threading.Tasks.Task<Supplier> GetAsync(string projectionName, Int32 supplierId)
		{
			return ((IRepository<Supplier>)this).GetAsync(projectionName, supplierId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Supplier> GetAsync(string projectionName, Int32 supplierId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Supplier>)this).GetAsync(projectionName, supplierId, fetchMode);
		}

		public System.Threading.Tasks.Task<Supplier> GetAsync(Projection projection, Int32 supplierId)
		{
			return ((IRepository<Supplier>)this).GetAsync(projection, supplierId, FetchMode.UseIdentityMap);
		}

		public System.Threading.Tasks.Task<Supplier> GetAsync(Projection projection, Int32 supplierId, FetchMode fetchMode = FetchMode.UseIdentityMap)
		{
			return ((IRepository<Supplier>)this).GetAsync(projection, supplierId, fetchMode);
		}

		public System.Threading.Tasks.Task<Supplier> GetAsync(string projectionName, Int32 supplierId, params string[] fields)
		{
			return ((IRepository<Supplier>)this).GetAsync(projectionName, supplierId, fields);
		}

		public System.Threading.Tasks.Task<Supplier> GetAsync(Projection projection, Int32 supplierId, params string[] fields)
		{
			return ((IRepository<Supplier>)this).GetAsync(projection, supplierId, fields);
		}

		public System.Threading.Tasks.Task<bool> DeleteAsync(Int32 supplierId)
		{
			var entity = new Supplier { SupplierId = supplierId };
			return this.DeleteAsync(entity);
		}
			}
	[Obsolete("Use nameof instead")]
	public static partial class SupplierFields
	{
		public const string SupplierId = "SupplierId";
		public const string CompanyName = "CompanyName";
		public const string ContactName = "ContactName";
		public const string ContactTitle = "ContactTitle";
		public const string Address = "Address";
		public const string City = "City";
		public const string Region = "Region";
		public const string PostalCode = "PostalCode";
		public const string Country = "Country";
		public const string Phone = "Phone";
		public const string Fax = "Fax";
		public const string HomePage = "HomePage";
	}

	public static partial class SupplierProjections
	{
		public const string BaseTable = "BaseTable";
	}
}

namespace Northwind.Entities
{
	public partial class NorthwindDataService : DataService
	{
		partial void OnCreated();

		private void Init()
		{
			EntityNameToEntityViewTransform = TextTransform.ToPascalNamingConvention;
			EntityLiteProvider.DefaultSchema = "dbo";
			AuditDateTimeKind = DateTimeKind.Utc;
			OnCreated();
		}

        public NorthwindDataService() : base("Northwind")
        {
			Init();
        }

        public NorthwindDataService(string connectionStringName) : base(connectionStringName)
        {
			Init();
        }

        public NorthwindDataService(string connectionString, string providerName) : base(connectionString, providerName)
        {
			Init();
        }

		private Northwind.Entities.ProductRepository _ProductRepository;
		public Northwind.Entities.ProductRepository ProductRepository
		{
			get 
			{
				if ( _ProductRepository == null)
				{
					_ProductRepository = new Northwind.Entities.ProductRepository(this);
				}
				return _ProductRepository;
			}
		}

		private Northwind.Entities.OrderRepository _OrderRepository;
		public Northwind.Entities.OrderRepository OrderRepository
		{
			get 
			{
				if ( _OrderRepository == null)
				{
					_OrderRepository = new Northwind.Entities.OrderRepository(this);
				}
				return _OrderRepository;
			}
		}

		private Northwind.Entities.OrderDetailRepository _OrderDetailRepository;
		public Northwind.Entities.OrderDetailRepository OrderDetailRepository
		{
			get 
			{
				if ( _OrderDetailRepository == null)
				{
					_OrderDetailRepository = new Northwind.Entities.OrderDetailRepository(this);
				}
				return _OrderDetailRepository;
			}
		}

		private Northwind.Entities.CategoryRepository _CategoryRepository;
		public Northwind.Entities.CategoryRepository CategoryRepository
		{
			get 
			{
				if ( _CategoryRepository == null)
				{
					_CategoryRepository = new Northwind.Entities.CategoryRepository(this);
				}
				return _CategoryRepository;
			}
		}

		private Northwind.Entities.CustomerRepository _CustomerRepository;
		public Northwind.Entities.CustomerRepository CustomerRepository
		{
			get 
			{
				if ( _CustomerRepository == null)
				{
					_CustomerRepository = new Northwind.Entities.CustomerRepository(this);
				}
				return _CustomerRepository;
			}
		}

		private Northwind.Entities.EmployeeRepository _EmployeeRepository;
		public Northwind.Entities.EmployeeRepository EmployeeRepository
		{
			get 
			{
				if ( _EmployeeRepository == null)
				{
					_EmployeeRepository = new Northwind.Entities.EmployeeRepository(this);
				}
				return _EmployeeRepository;
			}
		}

		private Northwind.Entities.ShipperRepository _ShipperRepository;
		public Northwind.Entities.ShipperRepository ShipperRepository
		{
			get 
			{
				if ( _ShipperRepository == null)
				{
					_ShipperRepository = new Northwind.Entities.ShipperRepository(this);
				}
				return _ShipperRepository;
			}
		}

		private Northwind.Entities.SupplierRepository _SupplierRepository;
		public Northwind.Entities.SupplierRepository SupplierRepository
		{
			get 
			{
				if ( _SupplierRepository == null)
				{
					_SupplierRepository = new Northwind.Entities.SupplierRepository(this);
				}
				return _SupplierRepository;
			}
		}
	}
}
namespace Northwind.Entities
{
    public class RoundDateJsonConverter : Newtonsoft.Json.Converters.DateTimeConverterBase
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(DateTime) == objectType || typeof(DateTime) == objectType;
        }

        public override object ReadJson(Newtonsoft.Json.JsonReader reader, Type objectType, object existingValue, Newtonsoft.Json.JsonSerializer serializer)
        {
            DateTime? result = null;
            if (reader.TokenType == Newtonsoft.Json.JsonToken.String)
            {
                string valueAsString = (string)reader.Value;
                DateTime? date = (DateTime?)Newtonsoft.Json.Linq.JToken.Parse("\"" + valueAsString + "\"");
                if (date.HasValue) result = date.Value.AddHours(12).Date;
            }
            else if (reader.TokenType == Newtonsoft.Json.JsonToken.Date)
            {
                result = ((DateTime)reader.Value).AddHours(12).Date;
            }
            if (result == null && objectType == typeof(DateTime)) return DateTime.MinValue;
            return result; 
        }

        public override void WriteJson(Newtonsoft.Json.JsonWriter writer, object value, Newtonsoft.Json.JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                DateTime date = ((DateTime)value).AddHours(12).Date;
                writer.WriteValue(date.ToString("yyyy-MM-dd"));
            }
        }
    }
}
