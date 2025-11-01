PendingService.js



import React, { useState } from "react";
import "./PendingService.css";

const PendingServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    studentName: "",
    phoneNumber: "",
    product: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      service_type: formData.serviceType,
      start_date: formData.startDate,
      end_date: formData.endDate,
      total_days: formData.totalDays,
      student_name: formData.studentName,
      phone_number: formData.phoneNumber,
      product: formData.product,
    };

    try {
      const response = await fetch("http://localhost:8000/api/pending-services/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          serviceType: "",
          startDate: "",
          endDate: "",
          totalDays: "",
          studentName: "",
          phoneNumber: "",
          product: "",
        });
      } else {
        const err = await response.json();
        console.error("Failed:", err);
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-heading">
          <span className="icon">⏰</span>
          <h1>Pending Service</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full-width Service Type */}
          <div className="horizontal-form full-width">
            <div className="form-group full-width">
              <label>Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="internship">Internship</option>
                <option value="workshop">Workshop</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>

          {/* Next Rows: 3 in a row */}
          <div className="horizontal-form">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Total Days</label>
              <input type="number" name="totalDays" value={formData.totalDays} onChange={handleChange} required />
            </div>
          </div>

          <div className="horizontal-form">
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Product</label>
              <input type="text" name="product" value={formData.product} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PendingServiceForm;