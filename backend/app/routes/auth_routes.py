from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.extensions import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    if not username or not password or not role:
        return jsonify({"message": "username, password, role are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "username already exists"}), 409

    user = User(username=username, role=role)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "registered successfully"}), 201


@auth_bp.route("/auth/login", methods=["POST"])
@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({
            "status": "error",
            "message": "invalid credentials"
        }), 401

    token = create_access_token(identity={"id": user.id, "role": user.role})

    return jsonify({
        "status": "success",
        "message": "login success",
        "access_token": token,
        "role": user.role.lower() 
    }), 200
