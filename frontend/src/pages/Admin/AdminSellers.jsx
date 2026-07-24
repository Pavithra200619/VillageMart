import { useEffect, useState } from "react";
import axios from "axios";

function AdminSellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await axios.get(
        "https://villagemart-tu66.onrender.com/api/admin/sellers"
      );
      setSellers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Approved Shopkeepers</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Shop Name</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {sellers.length === 0 ? (
            <tr>
              <td colSpan="6">No Sellers Found</td>
            </tr>
          ) : (
            sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.shop_name}</td>
                <td>{seller.owner_name}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>{seller.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSellers;