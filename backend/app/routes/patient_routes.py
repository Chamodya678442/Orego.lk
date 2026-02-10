from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.patient import Patient

patient_bp = Blueprint("patient_bp", __name__)

@patient_bp.route("/", methods=["POST"])
def create_patient():
    data = request.get_json()

    patient = Patient(
        name=data["name"],
        age=data["age"],
        gender=data["gender"],
        contact=data["contact"]
    )

    db.session.add(patient)
    db.session.commit()

    return jsonify(patient.to_dict()), 201


@patient_bp.route("/", methods=["GET"])
def get_patients():
    patients = Patient.query.all()
    return jsonify([p.to_dict() for p in patients])
