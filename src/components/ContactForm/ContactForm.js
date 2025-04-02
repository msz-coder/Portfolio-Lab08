import React, { useState, useEffect, useContext } from "react";
import "./ContactForm.scss";
import StyleContext from "../../contexts/StyleContext";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const { isDark } = useContext(StyleContext);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem("contactFormDraft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactFormDraft", JSON.stringify(formData));
  }, [formData]);

  const sanitizeMessage = (msg) => {
    return {
      name: msg.name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "").trim(),
      email: msg.email.trim(),
      subject: msg.subject.replace(/[^A-Za-z ]/g, "").trim(),
      message: msg.message.replace(/[<>]/g, "").trim(),
    };
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(formData.name)) {
      newErrors.name = "Invalid name.";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email.";
    }
    if (!/^[A-Za-z ]+$/.test(formData.subject)) {
      newErrors.subject = "Subject should contain letters only.";
    }
    if (/[<>]/.test(formData.message)) {
      newErrors.message = "Message cannot contain < or > characters.";
    }
    if (!formData.consent) {
      newErrors.consent = "Consent is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const sanitized = sanitizeMessage(formData);
        const res = await fetch("https://portfolio-api-backend-0544f6fc6e71.herokuapp.com/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitized),
        });

        if (!res.ok) throw new Error("Message submission failed!");

        localStorage.removeItem("contactFormDraft");
        setFormData(initialState);
        setSubmitted(true);
      } catch (err) {
        setErrors({ submit: "Failed to submit message." });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isDark ? "dark-mode contact-form" : "contact-form"}
    >
      {["name", "email", "subject"].map((field) => (
        <div className="form-row" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <div className="input-wrap">
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        </div>
      ))}

      <div className="form-row">
        <label>Message:</label>
        <div className="input-wrap">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
      </div>

      <label className="consent-label">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
        />
        I consent to be contacted and have my information stored securely.
      </label>
      {errors.consent && <span className="error">{errors.consent}</span>}
      {errors.submit && <span className="error">{errors.submit}</span>}

      <button type="submit">Submit</button>
      {submitted && (
        <span className="success-msg">Message submitted successfully!</span>
      )}
    </form>
  );
}