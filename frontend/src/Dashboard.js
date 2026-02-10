import React from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import { useState } from 'react';
import DoctorDashboard from './Doctordashboard';
import AdminDashboard from './AdminDashboard' ;
import PatientDashboard from './PatientDashboard';
import NurseDashboard from './nurseDashboard';

function Dashboard() {
    const { role } = useParams();
    const title = role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard` : 'Dashboard';
    if (role === 'admin') return <AdminDashboard title={title} />;
    if (role === 'patient') return <PatientDashboard title={title} />;
    if (role === 'doctor') return <DoctorDashboard title = {title} />;
   if (role === 'nurse') return <NurseDashboard title = {title} />;

    return (
        <div className="dashboard">
            <h1>{title}</h1>
            <div className="state">Welcome to the {role} area.</div>
        </div>
    );
}
/*
function AdminDashboard({ title }) {
    const [people, setPeople] = useState([]);
    const [resources, setResources] = useState([]);
    const [staff, setStaff] = useState([]);
    const [tab, setTab] = useState('register');

    
    const [pFirst, setPFirst] = useState('');
    const [pLast, setPLast] = useState('');
    const [pDob, setPDob] = useState('');
    const [pGender, setPGender] = useState('');
    const [pContact, setPContact] = useState('');
    const [pAddress, setPAddress] = useState('');

    
    const [rType, setRType] = useState('bed');
    const [rName, setRName] = useState('');
    const [rQty, setRQty] = useState(1);

    
    const [sName, setSName] = useState('');
    const [sRole, setSRole] = useState('doctor');
    const [sGrade, setSGrade] = useState('');

    function addPerson(e) {
        e?.preventDefault();
        const id = Date.now();
        setPeople([{ id, first: pFirst, last: pLast, dob: pDob, gender: pGender, contact: pContact, address: pAddress }, ...people]);
        setPFirst(''); setPLast(''); setPDob(''); setPGender(''); setPContact(''); setPAddress('');
    }

    function addResource(e) {
        e?.preventDefault();
        const id = Date.now();
        setResources([{ id, type: rType, name: rName, qty: Number(rQty) }, ...resources]);
        setRName(''); setRQty(1);
    }

    function addStaff(e) {
        e?.preventDefault();
        const id = Date.now();
        setStaff([{ id, name: sName, role: sRole, grade: sGrade }, ...staff]);
        setSName(''); setSGrade('');
    }

    function deletePerson(id) {
        setPeople(people.filter(p => p.id !== id));
    }

    function deleteResource(id) {
        setResources(resources.filter(r => r.id !== id));
    }

    function deleteStaff(id) {
        setStaff(staff.filter(s => s.id !== id));
    }

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>{title}</h1>
                <nav className="admin-nav">
                    <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Register Person</button>
                    <button className={tab === 'resources' ? 'active' : ''} onClick={() => setTab('resources')}>Resources</button>
                    <button className={tab === 'staff' ? 'active' : ''} onClick={() => setTab('staff')}>Staff</button>
                    <button className={tab === 'view' ? 'active' : ''} onClick={() => setTab('view')}>View All</button>
                </nav>
            </header>

            <section className="admin-body">
                {tab === 'register' && (
                    <div className="admin-card">
                        <h2>Register Person</h2>
                        <form className="admin-form" onSubmit={addPerson}>
                            <div className="field-row">
                                <input required placeholder="First name" value={pFirst} onChange={e => setPFirst(e.target.value)} />
                                <input required placeholder="Last name" value={pLast} onChange={e => setPLast(e.target.value)} />
                            </div>
                            <div className="field-row">
                                <input type="date" placeholder="DOB" value={pDob} onChange={e => setPDob(e.target.value)} />
                                <select value={pGender} onChange={e => setPGender(e.target.value)}>
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="field-row">
                                <input placeholder="Contact" value={pContact} onChange={e => setPContact(e.target.value)} />
                            </div>
                            <div className="field-row">
                                <input placeholder="Address" value={pAddress} onChange={e => setPAddress(e.target.value)} />
                            </div>
                            <div className="actions">
                                <button type="submit" className="primary">Add Person</button>
                            </div>
                        </form>

                        <div className="list">
                            <h3>Recently added</h3>
                            {people.length === 0 && <div className="empty">No people registered yet.</div>}
                            {people.map(p => (
                                <div key={p.id} className="card card-with-action">
                                    <div>
                                        <div><strong>{p.first} {p.last}</strong></div>
                                        <div>{p.dob} · {p.gender} · {p.contact}</div>
                                        <div className="muted">{p.address}</div>
                                    </div>
                                    <button className="delete-btn" onClick={() => deletePerson(p.id)}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'resources' && (
                    <div className="admin-card">
                        <h2>Manage Resources</h2>
                        <form className="admin-form" onSubmit={addResource}>
                            <div className="field-row">
                                <select value={rType} onChange={e => setRType(e.target.value)}>
                                    <option value="bed">Bed</option>
                                    <option value="ot">Operation Theater</option>
                                    <option value="ward">Ward</option>
                                </select>
                                <input placeholder="Name / Identifier" value={rName} onChange={e => setRName(e.target.value)} />
                                <input type="number" min={1} value={rQty} onChange={e => setRQty(e.target.value)} />
                            </div>
                            <div className="actions"><button className="primary" type="submit">Add Resource</button></div>
                        </form>

                        <div className="list">
                            <h3>Resources</h3>
                            {resources.length === 0 && <div className="empty">No resources yet.</div>}
                            {resources.map(r => (
                                <div key={r.id} className="card card-with-action">
                                    <div>
                                        <div><strong>{r.type.toUpperCase()}</strong> — {r.name}</div>
                                        <div className="muted">Quantity: {r.qty}</div>
                                    </div>
                                    <button className="delete-btn" onClick={() => deleteResource(r.id)}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'staff' && (
                    <div className="admin-card">
                        <h2>Manage Staff</h2>
                        <form className="admin-form" onSubmit={addStaff}>
                            <div className="field-row">
                                <input placeholder="Full name" value={sName} onChange={e => setSName(e.target.value)} />
                                <select value={sRole} onChange={e => setSRole(e.target.value)}>
                                    <option value="doctor">Doctor</option>
                                    <option value="nurse">Nurse</option>
                                </select>
                                <input placeholder="Grade" value={sGrade} onChange={e => setSGrade(e.target.value)} />
                            </div>
                            <div className="actions"><button className="primary" type="submit">Add Staff</button></div>
                        </form>

                        <div className="list">
                            <h3>Staff</h3>
                            {staff.length === 0 && <div className="empty">No staff added yet.</div>}
                            {staff.map(s => (
                                <div key={s.id} className="card card-with-action">
                                    <div>
                                        <div><strong>{s.name}</strong> — {s.role}</div>
                                        <div className="muted">Grade: {s.grade}</div>
                                    </div>
                                    <button className="delete-btn" onClick={() => deleteStaff(s.id)}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'view' && (
                    <div className="admin-card">
                        <h2>All Records</h2>
                        <div className="list-grid">
                            <div>
                                <h4>People</h4>
                                {people.length === 0 ? <div className="empty">—</div> : people.map(p => (
                                    <div key={p.id} className="card small card-with-action">
                                        <span>{p.first} {p.last} · {p.contact}</span>
                                        <button className="delete-btn" onClick={() => deletePerson(p.id)}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4>Resources</h4>
                                {resources.length === 0 ? <div className="empty">—</div> : resources.map(r => (
                                    <div key={r.id} className="card small card-with-action">
                                        <span>{r.type} · {r.name} · {r.qty}</span>
                                        <button className="delete-btn" onClick={() => deleteResource(r.id)}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4>Staff</h4>
                                {staff.length === 0 ? <div className="empty">—</div> : staff.map(s => (
                                    <div key={s.id} className="card small card-with-action">
                                        <span>{s.name} · {s.role} · Grade: {s.grade}</span>
                                        <button className="delete-btn" onClick={() => deleteStaff(s.id)}>✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}*/
/*
function PatientDashboard({ title }) {
    
    const patientName = 'Sanduni abewardana';
    const schedules = [
        { id: 1, date: '2025-12-28', time: '10:00 AM', type: 'Routine Checkup', doctor: 'Dr. Kavinda', status: 'Confirmed' },
        { id: 2, date: '2025-12-30', time: '2:00 PM', type: 'Surgery', doctor: 'Dr. Janodi', status: 'Scheduled' }
    ];
    const allocation = {
        bed: 'Ward A - Bed 5',
        ward: 'General Ward A',
        ot: 'Operation Theater 2'
    };

    return (
        <div className="patient-panel">
            <header className="patient-header">
                <h1>{title}</h1>
                <div className="patient-info">Welcome, {patientName}</div>
            </header>

            <section className="patient-body">
                
                <div className="patient-card">
                    <h2>Your Allocations</h2>
                    <div className="allocation-grid">
                        <div className="allocation-item">
                            <div className="label">Bed</div>
                            <div className="value">{allocation.bed}</div>
                        </div>
                        <div className="allocation-item">
                            <div className="label">Ward</div>
                            <div className="value">{allocation.ward}</div>
                        </div>
                        <div className="allocation-item">
                            <div className="label">Operation Theater</div>
                            <div className="value">{allocation.ot}</div>
                        </div>
                    </div>
                </div>

                
                <div className="patient-card">
                    <h2>Operation Schedules</h2>
                    {schedules.length === 0 ? (
                        <div className="empty-state">No schedules assigned yet.</div>
                    ) : (
                        <div className="schedules-list">
                            {schedules.map(sched => (
                                <div key={sched.id} className="schedule-item">
                                    <div className="schedule-date">{sched.date}</div>
                                    <div className="schedule-details">
                                        <div className="schedule-type"><strong>{sched.type}</strong></div>
                                        <div className="schedule-meta">
                                            Time: {sched.time} · Doctor: {sched.doctor}
                                        </div>
                                    </div>
                                    <div className={`schedule-status ${sched.status.toLowerCase()}`}>
                                        {sched.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}*/

/*function DoctorDashboard({ title }) {
    const doctorName = 'Dr. Kavinda Senevirathna';
    const doctorGrade = 'Senior Consultant';

    const schedules = [
        { id: 1, date: '2025-12-28', time: '10:00 AM', type: 'Surgery', patient: 'Sanduni Abewardana', duration: '2 hrs', ot: 'OT 2', status: 'Confirmed' },
        { id: 2, date: '2025-12-29', time: '2:00 PM', type: 'Consultation', patient: 'Janodi chamodya', duration: '30 mins', ot: 'Consultation Room 1', status: 'Scheduled' },
        { id: 3, date: '2025-12-30', time: '11:00 AM', type: 'Follow-up', patient: 'Sithumi hettiarachchi', duration: '20 mins', ot: 'Ward A', status: 'Confirmed' }
    ];

    const patients = [
        { id: 1, name: 'Sanduni Abewardana', age: 23, gender: 'Female', condition: 'Post-Surgery', ward: 'Ward A', bed: 'Bed 5', contact: '0771234567' },
        { id: 2, name: 'Janodi chamodya', age: 22, gender: 'Male', condition: 'Under Observation', ward: 'Ward B', bed: 'Bed 12', contact: '0772345678' },
        { id: 3, name: 'sithumi hettiarachchi', age: 22, gender: 'Female', condition: 'Pre-Surgery Checkup', ward: 'Ward A', bed: 'Bed 8', contact: '0773456789' }
    ];

    const wards = [
        { id: 1, name: 'Ward A', patients: 15, capacity: 20 },
        { id: 2, name: 'Ward B', patients: 12, capacity: 20 }
    ];

    return (
        <div className="doctor-panel">
            <header className="doctor-header">
                <div>
                    <h1>{title}</h1>
                    <div className="doctor-info">
                        <span className="doctor-name">{doctorName}</span> · <span className="doctor-grade">{doctorGrade}</span>
                    </div>
                </div>
            </header>

            <section className="doctor-body">
                
                <div className="doctor-card">
                    <h2>📅 My Schedules</h2>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map(sched => (
                                        <tr key={sched.id}>
                                            <td><strong>{sched.date}</strong></td>
                                            <td>{sched.time}</td>
                                            <td>{sched.type}</td>
                                            <td>{sched.patient}</td>
                                            <td>{sched.ot}</td>
                                            <td>{sched.duration}</td>
                                            <td><span className={`status-badge ${sched.status.toLowerCase()}`}>{sched.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                
                <div className="doctor-card">
                    <h2>👥 My Patients</h2>
                    {patients.length === 0 ? (
                        <div className="empty-state">No patients assigned.</div>
                    ) : (
                        <div className="patients-grid">
                            {patients.map(patient => (
                                <div key={patient.id} className="patient-item">
                                    <div className="patient-header">
                                        <div className="patient-name">{patient.name}</div>
                                        <div className="patient-age">{patient.age}y · {patient.gender}</div>
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
                                            <span className="value">{patient.contact}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            
                <div className="doctor-card">
                    <h2>🏥 Ward Overview</h2>
                    <div className="wards-grid">
                        {wards.map(ward => (
                            <div key={ward.id} className="ward-item">
                                <div className="ward-name">{ward.name}</div>
                                <div className="ward-capacity">
                                    <div className="capacity-bar">
                                        <div className="capacity-used" style={{ width: `${(ward.patients / ward.capacity) * 100}%` }}></div>
                                    </div>
                                    <div className="capacity-text">{ward.patients}/{ward.capacity} patients</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}*/

export default Dashboard;