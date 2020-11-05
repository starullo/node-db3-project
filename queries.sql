-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT productname, categoryid from product
join category on product.categoryid = category.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select
	O.Id,
	S.CompanyName AS COMPANYNAMEEEE
from
	[Order] as O
join Shipper as S
	on S.Id = O.ShipVia
where O.OrderDate < '2012-08-09'


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select
	OD.OrderId, OD.ProductId, OD.Quantity, P.ProductName
from
[orderDetail] as OD
join Product as P
	on P.Id = OD.ProductId
WHERE
OD.OrderId = '10251'
order BY
P.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select
O.Id as "Order ID", Customer.CompanyName as "Customer Company Name", Employee.LastName as "Employee Last Name"
from
[Order] as O
JOIN Customer
on Customer.Id = O.CustomerId
join Employee
on Employee.Id = O.EmployeeId