import React, { useState , useMemo } from 'react';
import "./AdminDashboard.css";



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
}

export default AdminDashboard;