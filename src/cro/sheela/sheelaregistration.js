import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./sheelaregistration.css";

const products = [
  "Java Fullstack", "Python Fullstack", "ML", "AI", "Software Testing",
  "MERN Stack", "MEAN Stack", "UI/UX", "CCNA", "AWS", "Ethical Hacking", "Data Science",
];

const staffList = [
  "Selva Tharshini", "Wincy", "Thanika", "Paneer Selvam", "Abinash",
  "Nanthini", "Reegan", "Neelaveni",
];

const courseFees = {
  "Java Fullstack": 25000,
  "Python Fullstack": 22000,
  "ML": 30000,
  "AI": 35000,
  "Software Testing": 20000,
  "MERN Stack": 28000,
  "MEAN Stack": 27000,
  "UI/UX": 24000,
  "CCNA": 18000,
  "AWS": 26000,
  "Ethical Hacking": 30000,
  "Data Science": 32000,
};

const SheelaRegistration = () => {
  const location = useLocation();
  const walkinRow = location.state?.walkinRow || {};

  const [paymentType, setPaymentType] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    date: "",
    name: walkinRow.walkName || "",
    address: "",
    enquireProduct: walkinRow.product || "",
    contactNumber: "",
    staffName: walkinRow.techStaff || "",
    course: walkinRow.product || "",
  });

  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    if (walkinRow) {
      setFormData(prev => ({
        ...prev,
        name: walkinRow.walkName || "",
        enquireProduct: walkinRow.product || "",
        staffName: walkinRow.techStaff || "",
        course: walkinRow.product || "",
      }));
    }
  }, [walkinRow]);

  // Auto calculate total fees for single payment
  useEffect(() => {
    if (formData.course && paymentType === "single") {
      setTotalFees(courseFees[formData.course] || "");
    }
  }, [formData.course, paymentType]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPaymentType(e.target.value);

  const handleSave = async () => {
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.name || !formData.contactNumber || !phonePattern.test(formData.contactNumber)) {
      alert("⚠ Please fill all required fields with valid phone number.");
      return;
    }

    const discountLimit = 5; // OTP required if discount > 5%

    // 🧩 STEP 1: Send OTP request to backend if discount > limit
    let otpVerified = false;
    if (discount > discountLimit) {
      try {
        const otpResponse = await fetch("http://127.0.0.1:8000/send-otp/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ discount, course: formData.course }),
        });
        const otpData = await otpResponse.json();

        if (otpData.success) {
          const userOtp = prompt("Enter OTP sent to admin:");
          if (userOtp === otpData.otp) {
            alert("✅ OTP verified successfully!");
            otpVerified = true;
          } else {
            alert("❌ Invalid OTP!");
            return;
          }
        } else {
          alert("⚠ Failed to send OTP. Please try again.");
          return;
        }
      } catch (err) {
        console.error("OTP send error:", err);
        alert("❌ Error sending OTP.");
        return;
      }
    }

    // 🧩 STEP 2: Prepare entry to save in DB
    const entry = {
      date: formData.date,
      name: formData.name,
      address: formData.address,
      enquire_product: formData.enquireProduct,
      contact_number: formData.contactNumber,
      staff_name: formData.staffName,
      course: formData.course,
      payment_type: paymentType,
      installment_count: paymentType === "installment" ? Number(installmentCount) : null,
      installment_date: paymentType === "installment" ? installmentDate : null,
      total_fees: paymentType === "single" ? Number(totalFees) : null,
      discount: paymentType === "single" ? Number(discount) : null,
      otp_verified: otpVerified,
    };

    // 🧩 STEP 3: Save data to Django backend
    try {
      const res = await fetch("http://127.0.0.1:8000/api/sheela-registrations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      const resData = await res.json();

      if (res.ok) {
        alert("✅ Data saved to database!");
        setSavedData([...savedData, entry]);
        setFormData({
          date: "",
          name: walkinRow.walkName || "",
          address: "",
          enquireProduct: walkinRow.product || "",
          contactNumber: "",
          staffName: walkinRow.techStaff || "",
          course: walkinRow.product || "",
        });
        setPaymentType("");
        setInstallmentCount("");
        setInstallmentDate("");
        setTotalFees("");
        setDiscount(0);
      } else {
        console.error("Server validation errors:", resData);
        alert("⚠ Failed to save data! Check console for details.");
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("❌ Server error!");
    }
  };

  const downloadExcel = () => {
    if (savedData.length === 0) return alert("⚠ No data to download!");
    const worksheet = XLSX.utils.json_to_sheet(savedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "RegistrationData.xlsx");
  };

  return (
    <div className="registration-container">
      <h1>Registration Details</h1>
      <form onSubmit={(e) => e.preventDefault()} className="registration-form">
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />

        <label>Enquired Product</label>
        <select name="enquireProduct" value={formData.enquireProduct} onChange={handleChange} required>
          <option value="">-- Select Product --</option>
          {products.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <label>Contact Number</label>
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} maxLength="10" required />

        <label>Demo Given By</label>
        <select name="staffName" value={formData.staffName} onChange={handleChange} required>
          <option value="">-- Select Staff --</option>
          {staffList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label>Course</label>
        <select name="course" value={formData.course} onChange={handleChange} required>
          <option value="">-- Select Course --</option>
          {products.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Fees Type</label>
        <select value={paymentType} onChange={handlePaymentChange} required>
          <option value="">-- Select --</option>
          <option value="single">Single Payment</option>
          <option value="installment">Installment</option>
        </select>

        {paymentType === "installment" && (
          <div>
            <label>Installment Count</label>
            <input type="number" value={installmentCount} onChange={e => setInstallmentCount(e.target.value)} required />
            <label>Installment Date</label>
            <input type="date" value={installmentDate} onChange={e => setInstallmentDate(e.target.value)} required />
          </div>
        )}

        {paymentType === "single" && (
          <div>
            <label>Total Fees</label>
            <input type="number" value={totalFees} onChange={e => setTotalFees(Number(e.target.value))} required />
            <label>Discount</label>
            <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
          </div>
        )}

        <button type="button" onClick={handleSave}>Add Data</button>
      </form>

      <button onClick={downloadExcel} style={{ marginTop: "20px", backgroundColor: "#28a745" }}>Download Excel</button>
    </div>
  );
};

export default SheelaRegistration;
