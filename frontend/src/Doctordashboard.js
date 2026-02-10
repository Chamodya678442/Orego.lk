import React, { useState , useMemo } from "react";
import "./doctordashboard.css";

function DoctorDashboard({title = "Doctor Dashboard"}){

  const doctorName = "Dr. Narmada Wijesinghe";
  const doctorGrade ="Senior Consultant";
  const doctorDept = "Cardiology";

//Search state 
const [searchQuery, setSearchQuery] = useState("");
// View details section
const handleViewDetails = (item) => {
  alert(
      `Details\n\nType: ${item.type}\nPatient: ${item.patient}\nDate: ${item.date}\nTime: ${item.time}\nLocation: ${item.location}\nStatus: ${item.status}`
    );
  };

const schedules = [
    {id: 1,date: "2025-12-28",time: "10:00 AM",type: "Surgery",patient: "Mayura Perera",location: "OT 2",duration: "2 hrs",status: "Confirmed",},
    {id: 2,date: "2025-12-29",time: "2:00 PM",type: "Consultation",patient: "Shan Gunasekara",location: "Consultation Room 1",duration: "30 mins",status: "Scheduled",},
    {id: 3,date: "2025-12-30",time: "11:00 AM",type: "Follow-up",patient: "Pawan Madhuwantha",location: "Ward A",duration: "20 mins",status: "Confirmed",},
    {id: 4,date: "2025-12-31",time: "9:00 AM",type: "Surgery",patient: "Lisa Perera",location: "OT 1",duration: "6 hrs",status: "Pending Approval",},
  ];

  const patients = [
    {id: 1,name: "Priyantha Opanayake",age: 42,gender: "Male",condition: "Post-Surgery",ward: "Ward A",bed: "Bed 5",contact: "077567457",},
    {id: 2,name: "Amaya Sithmi",age: 22,gender: "Female",condition: "Under Observation",ward: "Ward B",bed: "Bed 12",contact: "0772345608",},
    {id: 3,name: "Sithum Pansilu",age: 12,gender: "Male",condition: "Pre-Surgery Checkup",ward: "Ward A",bed: "Bed 8",contact: "0773456789",},
  ];

  const wards = [
    { id: 1, name: "Ward A (General)", patients: 15, capacity: 20 },
    { id: 2, name: "Ward B (Surgery)", patients: 12, capacity: 20 },
    { id: 3, name: "Ward C ", patients: 18, capacity: 20 },
    { id: 4, name: "ICU", patients: 8, capacity: 10 },
  ];

  //Emergency notifications
  const notifications = [
    {
      id: 1,
      level: "critical",
      title: "Cardiac Arrest - ER-1",
      time: "5 min ago",
      text: "Patient Mayura Sandeepa requires immediate cardiac intervention",
    },
    {
      id: 2,
      level: "warning",
      title: "Surgery Schedule Changed",
      time: "15 min ago",
      text: "OT-1 time moved to 9:00 AM due to emergency",
    },
    {
      id: 3,
      level: "info",
      title: "Lab Results Available",
      time: "1 hour ago",
      text: "Pre-op blood work completed for Mayura Perera",
    },
  ];

const newCount = 2;

const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        p.ward.toLowerCase().includes(q)
    );
  }, [searchQuery, patients]);

const statusClass = (status) => {
    const s = status.toLowerCase();
    if (s.includes("confirmed")) return "confirmed";
    if (s.includes("scheduled")) return "scheduled";
    if (s.includes("pending")) return "pending";
    return "default";
  };

const [schedulesState, setSchedulesState] = useState(schedules);
//Only for not happen crashes when accept and reject button was clicked 
const handleDecision = (id, decision) => {
  setSchedulesState(prev =>
    prev.map(s =>
      s.id === id ? { ...s, status: decision === "Accepted" ? "Confirmed" : "Rejected" } : s
    )
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning!";
  if (hour < 17) return "Good Afternoon!";
  return "Good Evening!";
};


return(
  <div className = "doctor-panel">
    <header className = "doctor-header">
      <div className = "doctor-title-wrap">
        <h1 className="greeting-text">{getGreeting()}</h1>
        <div className = "doctor-info">
          <span className="doctor-name">{doctorName}</span> ·{" "}
            <span className="doctor-grade">{doctorGrade}</span> -{" "}
            <span className="doctor-dept">{doctorDept}</span>
          </div>
        </div>
      </header>

      <section className="doctor-body">
        {/*My Schedules */}
        <div className="doctor-card">
          <div className="card-header">
            <h2>
              <span className="icon">📅</span> My Schedules
            </h2>
          </div>

          {schedules.length === 0 ? (
            <div className="empty-state">No schedules assigned.</div>
          ) : (
            <div className="schedules-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Patient</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((sched) => (
                    <tr key={sched.id}>
                      <td className="normal-text">{sched.date}</td>
                      <td>{sched.time}</td>
                      <td>{sched.type}</td>
                      <td className="linkish">{sched.patient}</td>
                  
                      <td>{sched.location}</td>

                      <td>{sched.duration}</td>
                      <td>
                        <span className={`status-badge ${statusClass(sched.status)}`}>
                          {sched.status}
                        </span>
                      </td>

                      
                      <td className="actions-col">
                        {sched.status.toLowerCase().includes("pending") ? (
                          <div className="btn-row">
                            <button
                              className="btn btn-accept"
                              onClick={() => handleDecision(sched.id, "Accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-reject"
                              onClick={() => handleDecision(sched.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button
                            className="link-btn"
                            onClick={() => handleViewDetails(sched)}
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/*Patients */}
        <div className="doctor-card">
          <div className="card-header card-header-row">
            <h2>
              <span className="icon">👥</span> My Patients
            </h2>

            {/* Added search box */}
            <div className="search-wrap">
              <input
                className="search-input"
                placeholder="Search patient / condition / ward..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="empty-state">No matching patients.</div>
          ) : (
            <div className="patients-grid">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="patient-item">
                  <div className="patient-header">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-age">
                      {patient.age}y · {patient.gender}
                    </div>
                  </div>

                  <div className="patient-details">
                    <div className="detail-row">
                      <span className="label">Condition:</span>
                      <span className="value">{patient.condition}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Ward:</span>
                      <span className="value">{patient.ward}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Bed:</span>
                      <span className="value">{patient.bed}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Contact:</span>
                      <span className="value linkish">{patient.contact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*Ward Overview */}
        <div className="doctor-card">
          <div className="card-header">
            <h2>
              <span className="icon">🏥</span> Ward Overview
            </h2>
          </div>

          <div className="wards-grid">
            {wards.map((ward) => {
              const pct = Math.round((ward.patients / ward.capacity) * 100);
              return (
                <div key={ward.id} className="ward-item">
                  <div className="ward-top">
                    <div className="ward-name">{ward.name}</div>
                    <div className="ward-count">
                      {ward.patients}/{ward.capacity} patients
                    </div>
                  </div>

                  <div className="capacity-bar">
                    <div className="capacity-used" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Requesting Resources */}
        <div className="doctor-card">
          <div className="card-header">
            <h2>
              <span className="icon">🧾</span> Request Resources
            </h2>
          </div>

          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-ico">🏥</div>
              <div className="resource-title">Request Operation Theatre</div>
              <div className="resource-sub">Book OT for surgery</div>
            </div>

            <div className="resource-card">
              <div className="resource-ico">👥</div>
              <div className="resource-title">Request Staff</div>
              <div className="resource-sub">Additional staff for surgery</div>
            </div>

            <div className="resource-card">
              <div className="resource-ico">🛏️</div>
              <div className="resource-title">Request Bed</div>
              <div className="resource-sub">Reserve bed for patient</div>
            </div>
          </div>
        </div>

        {/* ✅ Emergency Notifications */}
        <div className="doctor-card">
          <div className="card-header card-header-row">
            <h2>
              <span className="icon">⚠️</span> Emergency Notifications
            </h2>

            <span className="pill-badge">{newCount} New</span>
          </div>

          <div className="notifications">
            {notifications.map((n) => (
              <div key={n.id} className={`notify-item ${n.level}`}>
                <div className="notify-dot" />
                <div className="notify-body">
                  <div className="notify-title">
                    {n.title} <span className="notify-time">{n.time}</span>
                  </div>
                  <div className="notify-text">{n.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default DoctorDashboard;
