print("✅ LOADED: app/__init__.py")

from flask import Flask
from config import Config
from app.extensions import db, jwt
from flask_cors import CORS
import os

def create_app():
    print("✅ create_app() CALLED")
    app = Flask(__name__)
    app.config.from_object(Config)

    # Force DB URI from .env
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

    # ✅ CORS must be set early
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    jwt.init_app(app)

    # Blueprints
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    from app.routes.patient_routes import patient_bp
    app.register_blueprint(patient_bp, url_prefix="/patient")

    from app.routes.doctor_routes import doctor_bp
    app.register_blueprint(doctor_bp, url_prefix="/doctor")

    from app.routes.nurse_routes import nurse_bp
    app.register_blueprint(nurse_bp, url_prefix="/nurse")

    @app.route("/")
    def home():
        return {"message": "Hospital Backend Running ✅"}

    with app.app_context():
        db.create_all()

    return app

