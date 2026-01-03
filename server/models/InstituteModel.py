from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from datetime import date, datetime

from config import db

from validators.validate_dates import validate_dates

class InstituteModel(db.Model, SerializerMixin):
    __tablename__ = "institutes"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    logo = db.Column(db.String, nullable = False, unique = True)
    info = db.Column(db.String, nullable = False)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date)

    projects = db.relationship("ProjectModel", back_populates = "institute")

    serialize_rules = (
        "-projects.institute",
    )

    @validates("start_date")
    def validate_start_date(self, key, value):
        value = validate_dates(value, key)

        return value
    
    @validates("end_date")
    def validate_end_date(self, key, value):
        if value:
            value = validate_dates(value, key)
        
        if value and self.start_date and value <= self.start_date:
            raise ValueError("You must have finished at the institute after you started")
        
        return value