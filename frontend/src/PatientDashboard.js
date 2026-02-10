import React, { useState , useMemo} from 'react';
import "./PatientDashboard.css";

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
}
export default PatientDashboard;