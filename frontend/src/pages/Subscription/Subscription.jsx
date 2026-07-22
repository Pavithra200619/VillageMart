import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Subscription() {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});

  const [formData, setFormData] = useState({
    Milk: {
      quantity: 1,
      frequency: "Daily",
      delivery_time: "Morning",
      start_date: new Date().toISOString().split("T")[0],
    },
    Eggs: {
      quantity: "6 Eggs",
      frequency: "Weekly",
      delivery_time: "Morning",
      start_date: new Date().toISOString().split("T")[0],
    },
    Curd: {
      quantity: "200g",
      frequency: "Daily",
      delivery_time: "Morning",
      start_date: new Date().toISOString().split("T")[0],
    },
    Bread: {
      quantity: 1,
      frequency: "Daily",
      delivery_time: "Morning",
      start_date: new Date().toISOString().split("T")[0],
    },
  });

  const items = [
    {
      name: "Milk",
      frequencyOptions: ["Daily", "Alternate Days", "Weekly"],
    },
    {
      name: "Eggs",
      frequencyOptions: ["Weekly"],
    },
    {
      name: "Curd",
      frequencyOptions: ["Daily", "Alternate Days"],
    },
    {
      name: "Bread",
      frequencyOptions: ["Daily", "Weekdays"],
    },
  ];

  const subscribe = async (itemName) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        "http://localhost:5000/api/subscriptions",
        {
          user_id: user.id,
          product_name: itemName,
          quantity: formData[itemName].quantity,
          frequency: formData[itemName].frequency,
          delivery_time: formData[itemName].delivery_time,
          start_date: formData[itemName].start_date,
        }
      );

      alert(response.data.message);

      setSubscriptions([
        ...subscriptions,
        response.data.subscription,
      ]);

      setSubscriptionStatus({
        ...subscriptionStatus,
        [itemName]: {
          id: response.data.subscription.id,
          status: response.data.subscription.status,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Subscription Failed");
    }
  };

  const pauseSubscription = async (itemName) => {
    try {
      const id = subscriptionStatus[itemName].id;

      await axios.put(
        `http://localhost:5000/api/subscriptions/${id}/pause`
      );

      setSubscriptionStatus({
        ...subscriptionStatus,
        [itemName]: {
          ...subscriptionStatus[itemName],
          status: "Paused",
        },
      });

      alert("Subscription Paused");
    } catch (err) {
      console.error(err);
    }
  };

  const resumeSubscription = async (itemName) => {
    try {
      const id = subscriptionStatus[itemName].id;

      await axios.put(
        `http://localhost:5000/api/subscriptions/${id}/resume`
      );

      setSubscriptionStatus({
        ...subscriptionStatus,
        [itemName]: {
          ...subscriptionStatus[itemName],
          status: "Active",
        },
      });

      alert("Subscription Resumed");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelSubscription = async (itemName) => {
    try {
      const id = subscriptionStatus[itemName].id;

      await axios.put(
        `http://localhost:5000/api/subscriptions/${id}/cancel`
      );

      setSubscriptionStatus({
        ...subscriptionStatus,
        [itemName]: {
          ...subscriptionStatus[itemName],
          status: "Cancelled",
        },
      });

      alert("Subscription Cancelled");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <button
        onClick={() => navigate("/home")}
        style={{
          background: "#2E7D32",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Home
      </button>

      <h1
        style={{
          color: "#1B5E20",
          textAlign: "center",
        }}
      >
        Daily Essentials Subscription
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Subscribe once and receive your essentials automatically.
      </p>

      {items.map((item) => (
        <div
          key={item.name}
          style={{
            marginBottom: "25px",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <h2>{item.name}</h2>

          {(item.name === "Milk" || item.name === "Bread") && (
            <>
              <label>Quantity</label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginTop: "8px",
                  marginBottom: "15px",
                }}
              >
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      [item.name]: {
                        ...formData[item.name],
                        quantity: Math.max(
                          1,
                          formData[item.name].quantity - 1
                        ),
                      },
                    })
                  }
                >
                  -
                </button>

                <span>{formData[item.name].quantity}</span>

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      [item.name]: {
                        ...formData[item.name],
                        quantity:
                          formData[item.name].quantity + 1,
                      },
                    })
                  }
                >
                  +
                </button>
              </div>
            </>
          )}

          {item.name === "Eggs" && (
            <>
              <label>Quantity</label>

              <select
                value={formData.Eggs.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Eggs: {
                      ...formData.Eggs,
                      quantity: e.target.value,
                    },
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <option>6 Eggs</option>
                <option>12 Eggs</option>
                <option>30 Eggs</option>
              </select>
            </>
          )}

          {item.name === "Curd" && (
            <>
              <label>Quantity</label>

              <select
                value={formData.Curd.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Curd: {
                      ...formData.Curd,
                      quantity: e.target.value,
                    },
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <option>200g</option>
                <option>500g</option>
                <option>1kg</option>
              </select>
            </>
          )}
          <label
            style={{
              display: "block",
              marginTop: "15px",
            }}
          >
            Frequency
          </label>

          <select
            value={formData[item.name].frequency}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: {
                  ...formData[item.name],
                  frequency: e.target.value,
                },
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            {item.frequencyOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <label
            style={{
              display: "block",
            }}
          >
            Delivery Time
          </label>

          <select
            value={formData[item.name].delivery_time}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: {
                  ...formData[item.name],
                  delivery_time: e.target.value,
                },
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <option>Morning</option>
            <option>Evening</option>
          </select>

          <label>Start Date</label>

          <input
            type="date"
            value={formData[item.name].start_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: {
                  ...formData[item.name],
                  start_date: e.target.value,
                },
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />

          <button
            onClick={() => subscribe(item.name)}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "12px",
              background: "#2E7D32",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>

          {subscriptionStatus[item.name] && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f8f8f8",
              }}
            >
              <h3>
                Status: {subscriptionStatus[item.name].status}
              </h3>

              {subscriptionStatus[item.name].status === "Active" && (
                <button
                  onClick={() => pauseSubscription(item.name)}
                  style={{
                    background: "#FFA000",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Pause
                </button>
              )}

              {subscriptionStatus[item.name].status === "Paused" && (
                <button
                  onClick={() => resumeSubscription(item.name)}
                  style={{
                    background: "#2E7D32",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Resume
                </button>
              )}

              {subscriptionStatus[item.name].status !== "Cancelled" && (
                <button
                  onClick={() => cancelSubscription(item.name)}
                  style={{
                    background: "#C62828",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Subscription;