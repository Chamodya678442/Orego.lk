from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.nurse import Nurse

nurse_bp = Blueprint("nurse_bp", __name__)

@nurse_bp.route("/", methods=["POST"])
def create_nurse():
    data = request.get_json()

    nurse = Nurse(
        id = data["id"],
        name=data["name"],
        grade=data["grade"],
        contact=data["contact"],
        availability=data["availability"]
    )

           

    db.session.add(nurse)
    db.session.commit()

    return jsonify(nurse.to_dict()), 201


@nurse_bp.route("/", methods=["GET"])
def get_nurses():
    nurses = Nurse.query.all()
    return jsonify([n.to_dict() for n in nurses])
