from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.doctor import Doctor

doctor_bp = Blueprint("doctor_bp", __name__)

@doctor_bp.route("/", methods=["POST"])
def create_doctor():
    data = request.get_json()

    doctor = Doctor(
      #  id = data["id"],
        name = data["name"],
        specialization=data["specialization"],
        contact=data["contact"],
        availability=data["availability"]
    )

    db.session.add(doctor)
    db.session.commit()

    return jsonify(doctor.to_dict()), 201

@doctor_bp.route("/", methods = ["GET"])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([d.to_dict() for d in doctors])