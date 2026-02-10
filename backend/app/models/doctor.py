from ..extensions import db

class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)   

    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100))
    contact = db.Column(db.String(12), nullable=False)
    availability = db.Column(db.String(20))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization,
            "contact": self.contact,
            "availability": self.availability
        }
