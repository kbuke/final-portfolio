from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from datetime import date, datetime

from config import db, bcrypt

from validators.validate_dates import validate_dates

class ProjectModel(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    intro = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False, unique = True)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date, nullable = True)
    web_url = db.Column(db.String, nullable = True, unique = True)
    git_url = db.Column(db.String, nullable = True, unique = True)

    # VALIDATE START DATE
    @validates("start_date")
    def validate_start_date(self, key, value):
        value = validate_dates(value, key)

        return value
    
    # VALIDATE END DATE
    @validates("end_date")
    def validate_end_date(self, key, value):
        if value:
            value = validate_dates(value, key)

        if value and self.start_date and value <= self.start_date:
            raise ValueError("End date must be after the start date")

        return value

