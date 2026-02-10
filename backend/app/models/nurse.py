from ..extensions import db

class Nurse(db.Model):
    __tablename__ = "nurses"

   
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    grade = db.Column(db.String(100))
    contact = db.Column(db.String(12), nullable=False)
    availability = db.Column(db.String(20), nullable=False)
    


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "grade": self.grade,
            "contact": self.contact,
            "availability": self.availability
        }
