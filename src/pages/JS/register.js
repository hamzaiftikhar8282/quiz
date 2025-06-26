import React, { useState } from "react";
import '../css/register.css';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const CustomizeCake = () => {
  const [form, setForm] = useState({
    flavor: "",
    size: "",
    message: "",
    theme: "",
    deliveryDate: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.flavor || !form.size || !form.message || !form.deliveryDate) {
      setStatus("Please fill all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "cakeOrders"), {
        ...form,
        createdAt: new Date()
      });

      setStatus("✅ Order submitted successfully!");
      setForm({
        flavor: "",
        size: "",
        message: "",
        theme: "",
        deliveryDate: ""
      });
    } catch (error) {
      console.error("Error adding order: ", error);
      setStatus("❌ Failed to submit order.");
    }
  };

  return (
    <div className="customize-container">
      <h1>🎂 Customize Your Cake</h1>
      <p className="contact">📞 +123-456-7890 | <b>Buy Now</b></p>

      <form onSubmit={handleSubmit}>
        <label>Cake Flavor:</label>
        <select name="flavor" value={form.flavor} onChange={handleChange} required>
          <option value="">Select Flavor</option>
          <option>Chocolate</option>
          <option>Vanilla</option>
          <option>Strawberry</option>
          <option>Red Velvet</option>
          <option>Black Forest</option>
        </select>

        <label>Cake Size:</label>
        <select name="size" value={form.size} onChange={handleChange} required>
          <option value="">Select Size</option>
          <option>1 Pound</option>
          <option>2 Pound</option>
          <option>3 Pound</option>
          <option>5 Pound</option>
        </select>

        <label>Custom Message on Cake:</label>
        <input
          type="text"
          name="message"
          placeholder="e.g. Happy Birthday!"
          value={form.message}
          onChange={handleChange}
          required
        />

        <label>Theme (Optional):</label>
        <input
          type="text"
          name="theme"
          placeholder="e.g. Spiderman, Princess..."
          value={form.theme}
          onChange={handleChange}
        />

        <label>Delivery Date:</label>
        <input
          type="date"
          name="deliveryDate"
          value={form.deliveryDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Order</button>
      </form>

      {status && <p className="status-message">{status}</p>}

      <div className="footer">
        <p>© 2025 Cake Delight. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CustomizeCake;
