import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/all"
      );

      console.log(res.data);

      setOrders(res.data);
      console.log("Orders:", res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
   const updateOrderStatus = async (id, status) => {
    console.log("Clicked ,id,status");
  try {
     await axios.put(
  `http://localhost:5000/api/orders/${id}`,
  {
    status: status,
  }
);

    fetchOrders();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Orders</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Payment</th>
            
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={`${o.id}-${o.product_name}`}>
              <td>{o.shop_name}</td>
              <td>{o.customer_name}</td>
              <td>{o.customer_email}</td>
              <td>{o.phone}</td>
              <td>{o.product_name}</td>
              <td>{o.quantity}</td>
              <td>₹{o.total_amount}</td>
              <td>{o.payment_method}</td>
              

               <td>
  {o.order_status === "Accepted" ? (
    <span
      style={{
        color: "green",
        fontWeight: "bold",
      }}
    >
      ✅ Accepted
    </span>
  ) : o.order_status === "Rejected" ? (
    <span
      style={{
        color: "red",
        fontWeight: "bold",
      }}
    >
      ❌ Rejected
    </span>
  ) : (
    <>
      <button
        onClick={() =>
          updateOrderStatus(o.id, "Accepted")
        }
      >
        Accept
      </button>

      <button
        style={{ marginLeft: "8px" }}
        onClick={() =>
          updateOrderStatus(o.id, "Rejected")
        }
      >
        Reject
      </button>
    </>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;