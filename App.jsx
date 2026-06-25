import React, { useState } from "react";

export default function App() {
  const [employee, setEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("Casual");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }

    const newRequest = {
      id: Date.now(),
      employee,
      leaveType,
      fromDate,
      toDate,
      status: "Pending",
    };

    setRequests([...requests, newRequest]);

    setEmployee("");
    setLeaveType("Casual");
    setFromDate("");
    setToDate("");
  };

  const updateStatus = (id, status) => {
    setRequests(
      requests.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1>HR Leave Management Tool</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          style={styles.input}
        />

        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          style={styles.input}
        >
          <option>Casual</option>
          <option>Sick</option>
          <option>Earned</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Apply Leave
        </button>
      </form>

      <h2>Leave Requests</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.employee}</td>
              <td>{req.leaveType}</td>
              <td>{req.fromDate}</td>
              <td>{req.toDate}</td>
              <td>{req.status}</td>
              <td>
                <button
                  onClick={() => updateStatus(req.id, "Approved")}
                  style={{ marginRight: "5px" }}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(req.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    fontFamily: "Arial",
    padding: "20px",
  },
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};