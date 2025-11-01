import React, { useState } from "react";

const AActivityTracker = () => {
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState("");
  const [otherActivity, setOtherActivity] = useState("");
  const [autoNo, setAutoNo] = useState("");
  const [cost, setCost] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [modalData, setModalData] = useState(null);

  const badgeColor = (type) => {
    if (type === "Pamphlet") return "#3498db";
    if (type === "AutoSticker") return "#27ae60";
    return "#f39c12";
  };

  const checkOther = (value) => {
    setActivityType(value);
    if (value !== "Other") setOtherActivity("");
  };

  const addActivity = () => {
    const type = activityType === "Other" ? otherActivity.trim() : activityType;
    if (!type || !autoNo || !cost || !phoneNo) return alert("Fill all fields!");

    const dateObj = new Date();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const dateTime = dateObj.toLocaleString();

    const newActivity = {
      id: activities.length + 1,
      activityType: type,
      autoNo,
      cost,
      phoneNo,
      dateTime,
      month,
    };

    setActivities([...activities, newActivity]);

    setActivityType("");
    setOtherActivity("");
    setAutoNo("");
    setCost("");
    setPhoneNo("");
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const renderTable = () => {
    const filtered = activities.filter(
      (act) => !filterMonth || act.month === filterMonth
    );

    if (filtered.length === 0)
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: "center", padding: "15px" }}>
            No activity yet
          </td>
        </tr>
      );

    return filtered.map((act) => (
      <tr
        key={act.id}
        onClick={() => setModalData(act)}
        style={{
          cursor: "pointer",
          transition: "0.2s",
          height: "45px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#f1f8ff")}
        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <td style={{ width: "5%", textAlign: "center" }}>{act.id}</td>
        <td style={{ width: "15%" }}>
          <span
            style={{
              background: badgeColor(act.activityType),
              color: "#fff",
              padding: "3px 8px",
              borderRadius: 4,
              fontSize: "0.85rem",
            }}
          >
            {act.activityType}
          </span>
        </td>
        <td style={{ width: "15%" }}>{act.autoNo}</td>
        <td style={{ width: "10%", textAlign: "right" }}>{act.cost}</td>
        <td style={{ width: "15%" }}>{act.phoneNo}</td>
        <td style={{ width: "25%" }}>{act.dateTime}</td>
        <td style={{ width: "10%", textAlign: "center" }}>
          <button
            style={{
              background: "#f44336",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteActivity(act.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div
  style={{
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f7fb",
    minHeight: "100vh",
    marginTop: "50px",
    marginLeft: "250px"  // left space added
  }}
>

      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
        Activity Tracker
      </h2>

      {/* Filter + Input Container */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Filter by Month: </label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Months</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={i} value={String(i + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Input Fields */}
        <div
          style={{
            display:"flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <select
            value={activityType}
            onChange={(e) => checkOther(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: "1 1 150px",
            }}
          >
            <option value="">Select Activity Type</option>
            <option value="Pamphlet">Pamphlet</option>
            <option value="AutoSticker">AutoSticker</option>
            <option value="Other">Other</option>
          </select>

          {activityType === "Other" && (
            <input
              type="text"
              placeholder="Enter Other Activity"
              value={otherActivity}
              onChange={(e) => setOtherActivity(e.target.value)}
              style={{
                padding: "8px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                flex: "1 1 150px",
              }}
            />
          )}

          <input
            type="text"
            placeholder="Auto No"
            value={autoNo}
            onChange={(e) => setAutoNo(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: "1 1 150px",
            }}
          />

          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: "1 1 100px",
              textAlign: "right",
            }}
          />

          <input
            type="text"
            placeholder="Phone No"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: "1 1 150px",
              width:"10px"
            }}
          />

          <button
            onClick={addActivity}
            style={{
              background: "#3498db",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Activity
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px",
          }}
        >
            
          <thead style={{ background: "lightskyblue" }}>
            <tr style={{ height: "45px" }}>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "15%" }}>Activity Type</th>
              <th style={{ width: "15%" }}>Auto No</th>
              <th style={{ width: "10%" }}>Cost</th>
              <th style={{ width: "15%" }}>Phone No</th>
              <th style={{ width: "25%" }}>Date/Time</th>
              <th style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>

      {/* Modal */}
      {modalData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setModalData(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                float: "right",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
              onClick={() => setModalData(null)}
            >
              X
            </span>
            <h3>Activity Details</h3>
            <p><b>ID:</b> {modalData.id}</p>
            <p><b>Activity Type:</b> {modalData.activityType}</p>
            <p><b>Auto No:</b> {modalData.autoNo}</p>
            <p><b>Cost:</b> {modalData.cost}</p>
            <p><b>Phone No:</b> {modalData.phoneNo}</p>
            <p><b>Date/Time:</b> {modalData.dateTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default AActivityTracker;