import React, { useState } from "react";

export default function ItEducationExpenseTracker() {
  const [expenses, setExpenses] = useState({
    daily: [],
    event: [],
    monthly: [],
    yearly: [],
  });
  const [totals, setTotals] = useState({
    daily: 0,
    event: 0,
    monthly: 0,
    yearly: 0,
  });

  const [formData, setFormData] = useState({
    item: "",
    person: "",
    amount: "",
    type: "daily",
    file: null,
  });

  const [modalImg, setModalImg] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleAddExpense = () => {
    const { item, person, amount, type, file } = formData;
    if (!item || !person || !amount) {
      alert("Please fill all fields!");
      return;
    }

    const amountValue = parseFloat(amount);
    const originId = Date.now().toString();

    const addExpenseLogic = (imgURL) => {
      const updated = { ...expenses };
      const updatedTotals = { ...totals };

      const addExpense = (category, label) => {
        updated[category] = [
          ...updated[category],
          {
            id: originId,
            item: label ? `[${label}] ${item}` : item,
            person,
            amount: amountValue,
            imgURL,
          },
        ];
        updatedTotals[category] += amountValue;
      };

      if (type === "daily") {
        addExpense("daily");
        addExpense("monthly", "Daily");
        addExpense("yearly", "Daily");
      } else if (type === "event") {
        addExpense("event");
        addExpense("daily", "Event");
        addExpense("monthly", "Event");
        addExpense("yearly", "Event");
      } else if (type === "monthly") {
        addExpense("monthly");
        addExpense("yearly", "Monthly");
      } else {
        addExpense("yearly");
      }

      setExpenses(updated);
      setTotals(updatedTotals);

      // Reset form
      setFormData({
        item: "",
        person: "",
        amount: "",
        type: "daily",
        file: null,
      });
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addExpenseLogic(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      addExpenseLogic(null);
    }
  };

  const handleRemove = (originId, amount) => {
    const updated = { ...expenses };
    const updatedTotals = { ...totals };

    Object.keys(updated).forEach((type) => {
      const filtered = updated[type].filter((exp) => exp.id !== originId);
      if (filtered.length !== updated[type].length) {
        updatedTotals[type] -= amount;
      }
      updated[type] = filtered;
    });

    setExpenses(updated);
    setTotals(updatedTotals);
  };

  const openModal = (img) => setModalImg(img);
  const closeModal = () => setModalImg(null);

  const renderTable = (title, type, emoji) => (
    <div className="container">
      <h3>
        {emoji} {title} Expenses
      </h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Paid To</th>
            <th>Amount (₹)</th>
            <th>Bill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses[type].map((exp) => (
            <tr key={exp.id}>
              <td>{exp.item}</td>
              <td>{exp.person}</td>
              <td>₹{exp.amount}</td>
              <td>
                {exp.imgURL ? (
                  <img
                    src={exp.imgURL}
                    alt={`Bill for ${exp.item}`}
                    className="bill-img"
                    onClick={() => openModal(exp.imgURL)}
                  />
                ) : (
                  "No Bill"
                )}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleRemove(exp.id, exp.amount)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ₹{totals[type]}</p>
    </div>
  );

  return (
    <div>
      <h1>It Expenses Tracker</h1>

      {/* Input Form */}
      <div className="container">
        <h3>Add Expense</h3>
        <input
          id="item"
          type="text"
          placeholder="Expense Item (e.g., Stationery, Seminar)"
          value={formData.item}
          onChange={handleChange}
        />
        <input
          id="person"
          type="text"
          placeholder="Paid To (e.g., Ram, Shop Name)"
          value={formData.person}
          onChange={handleChange}
        />
        <input
          id="amount"
          type="number"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={handleChange}
        />
        <select id="type" value={formData.type} onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="event">Event</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Expense Tables */}
      {renderTable("Daily", "daily", "📅")}
      {renderTable("Event", "event", "🎉")}
      {renderTable("Monthly", "monthly", "🗓")}
      {renderTable("Yearly", "yearly", "📖")}

      {/* Modal */}
      {modalImg && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-content">
            <img src={modalImg} alt="Full bill" />
          </div>
        </div>
      )}

      {/* Inline CSS */}
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background: white;
          color: black;
          margin: 0;
          padding: 20px;
          margin-left:10px;
          margin-top:50px;
        }
        h1 {
          margin-left:150px;
          margin-bottom: 30px;
        }
        .container {
          max-width: 900px;
          margin: 20px auto;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
        }
        h3 {
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
          margin-bottom: 15px;
        
        }
        input, button, select {
          padding: 10px;
          margin: 8px 0;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-size: 15px;
          color: black;
          background: white;
        }
        button {
          background: lightskyblue;
          color: white;
          font-weight: bold;
          transition: background 0.3s;
        }
        button:hover {
          background: grey;
        }
        table {
          width: 100%;
          margin-top: 10px;
          border-collapse: collapse;
          font-size: 14px;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th {
          background: #f3f3f3;
          text-align: center;
          padding: 10px;
        }
        td {
          padding: 8px;
          text-align: center;
        }
        .delete-btn {
          background: lightskyblue;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background: red;
        }
        .bill-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .bill-img:hover {
          transform: scale(1.1);
        }
        .modal {
          position: fixed;
          z-index: 1000;
          left: 0; top: 0;
          width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content img {
          width: 80%;
          border-radius: 10px;
        }
        .close {
          position: absolute;
          top: 20px; right: 35px;
          color: white;
          font-size: 40px;
          cursor: pointer;
        }
      `}
      </style>
    </div>
  );
}
