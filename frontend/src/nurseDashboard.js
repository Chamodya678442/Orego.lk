import React, { useState, useMemo} from 'react';
import { useEffect } from 'react';
import "./nurseDashboard.css";


function NurseDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [time, setTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);


  return (
    <div className="nurse-dashboard">
      <header className="nurse-header">
        <h1>👩‍⚕️ Nurse Dashboard</h1>
        <p>Hospital Management System</p>
        <small>🕒 {time.toLocaleTimeString()}</small>
      </header>

      <div className="nurse-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "patients" ? "active" : ""}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>

        <button
          className={activeTab === "schedule" ? "active" : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>

        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>
      </div>

      <div className="nurse-content">
        {activeTab === "profile" && <Profile />}
        {activeTab === "patients" && <Patients />}
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "tasks" && <Tasks />}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="nurse-card profile-card">
      <div className="profile-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Nurse"
          className="profile-avatar"
        />

        <div>
          <h2>🧑‍⚕️ Nurse Sithumi Manodhari Hettiarachchi
            <span className="grade-badge junior">Junior Nurse</span>
          </h2>
          <p className="profile-role">Registered Nurse</p>
        </div>
      </div>

      <div className="profile-grid">
        <div><strong>Ward:</strong> Ward A</div>
        <div><strong>Shift:</strong> Morning</div>
        <div><strong>Contact:</strong> 077 123 4567</div>
        <div><strong>Email:</strong> sithumi@hospital.lk</div>
      </div>
    </div>
  );
}


function Patients() {
  const patients = [
    { id: 1, name: "Sanduni Abeywardana", ward: "Ward A", bed: "Bed 5", status: "Stable" },
    { id: 2, name: "Janodi Chamodya", ward: "Ward B", bed: "Bed 12", status: "Observation" },
    { id: 3, name: "Sithumi Hettiarachchi", ward: "Ward A", bed: "Bed 8", status: "Critical" },
    { id: 4, name: "Kavinda Senevirathne", ward: "Ward A", bed: "Bed 9", status: "Stable" },
    { id: 5, name: "Sithumi Manodhari", ward: "Ward C", bed: "Bed 3", status: "Observation" }
  ];

  const [search, setSearch] = useState("");

  const filteredPatients = patients
  .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => (a.status === "Critical" ? -1 : 1));


  // 📊 COUNTS (based on filtered list)
  const stableCount = filteredPatients.filter(p => p.status === "Stable").length;
  const observationCount = filteredPatients.filter(p => p.status === "Observation").length;
  const criticalCount = filteredPatients.filter(p => p.status === "Critical").length;

  return (
    <div className="nurse-card">
      <h2>🛏️ Assigned Patients</h2>

      {/* 🔍 SEARCH - Search the patients which in the list*/}
      <input
        type="text"
        placeholder="Search patient by name..."
        className="patient-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 SUMMARY - Show the total amount of patients in various statuses*/}
      <div className="patient-summary">
        <div className="summary-card stable">Stable: {stableCount}</div>
        <div className="summary-card observation">Observation: {observationCount}</div>
        <div className="summary-card critical">Critical: {criticalCount}</div>
      </div>

      <table className="nurse-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ward</th>
            <th>Bed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.ward}</td>
              <td>{p.bed}</td>
              <td>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



function Schedule() {
  const schedule = [
  { id: 1, date: "2025-12-29", shift: "Morning (08:00–16:00)", ward: "Ward A" },
  { id: 2, date: "2025-12-29", shift: "Evening (16:00–00:00)", ward: "Ward B" },
  { id: 3, date: "2025-12-29", shift: "Night (00:00–08:00)", ward: "Ward C" },
  { id: 4, date: "2025-12-30", shift: "Morning (08:00–16:00)", ward: "Ward B" },
  { id: 5, date: "2025-12-30", shift: "Evening (16:00–00:00)", ward: "Ward A" },
  { id: 6, date: "2025-12-30", shift: "Night (00:00–08:00)", ward: "Ward C" },
  { id: 7, date: "2025-12-31", shift: "Morning (08:00–16:00)", ward: "Ward C" },
  { id: 8, date: "2026-01-02", shift: "Evening (16:00–00:00)", ward: "Ward A" }
  

];
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="nurse-card">
      <h2>📅 Duty Schedule</h2>

      <div className="schedule-grid">
        {schedule.map(s => (
          <div key={s.id} 
          className={`schedule-box ${s.date === today ? "today" : ""}`}>
            <div className="Schedule-date">📅 {s.date}</div>
            <div className="Schedule-shift">⏰ {s.shift} Shift</div>
            <div className="Schedule-ward">🏥 {s.ward}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Check patient vitals", done: false, priority: "high", time: "08:30 AM" },
    { id: 2, text: "Administer medications", done: false, priority: "high", time: "09:00 AM" },
    { id: 3, text: "Update patient records", done: false, priority: "medium", time: "10:00 AM" },
    { id: 4, text: "Assist doctors during rounds", done: false, priority: "low", time: "11:30 AM" },
    { id: 5, text: "Prepare discharge papers", done: false, priority: "medium", time: "02:00 PM" }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div className="nurse-card">
      <h2>✅ Daily Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Time</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className={task.done ? "done" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
              </td>
              <td>{task.text}</td>
              <td>{task.time}</td>
              <td className={`priority ${task.priority}`}>{task.priority.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default NurseDashboard;
