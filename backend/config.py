import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://user:@localhost:5432/hospital_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "change-this-secret"
