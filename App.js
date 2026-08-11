import React, { useState } from 'react';
import './App.css'; // Make sure to create this CSS file

function App() {
  // 1. Store participant list
  const [participants, setParticipants] = useState([]);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });

  // State for UI messages
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitted(false);

    // 4. Prevent duplicate entries (checking if email already exists)
    const isDuplicate = participants.some(
      (participant) => participant.email === formData.email
    );

    if (isDuplicate) {
      setErrorMessage('Registration failed: A participant with this email is already registered!');
      return;
    }

    // Add the new participant to the stored list
    const newParticipant = { ...formData, id: Date.now() };
    setParticipants([...participants, newParticipant]);

    // 3. Show confirmation message
    setIsSubmitted(true);

    // Clear the form fields after successful registration
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: ''
    });

    // Optional: Hide the success message after 4 seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="app-container">
      <h2>Workshop Registration</h2>

      {/* Confirmation Message Display */}
      {isSubmitted && (
        <div className="success-message">
          ✅ Registration successful! Your seat is confirmed.
        </div>
      )}

      {/* Error Message Display */}
      {errorMessage && (
        <div className="error-message">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* 2. Registration Form */}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>College Name:</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            placeholder="Enter your college"
          />
        </div>

        <button type="submit" className="submit-btn">Register Now</button>
      </form>

      <hr className="divider" />

      {/* Display the Stored Participant List in a Table */}
      <div className="participants-section">
        <h3>Registered Participants ({participants.length})</h3>
        
        {participants.length === 0 ? (
          <p className="no-data">No participants have registered yet.</p>
        ) : (
          <table className="participants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.college}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;