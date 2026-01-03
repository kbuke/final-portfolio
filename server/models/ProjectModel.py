from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from datetime import date, datetime

from config import db

from validators.validate_dates import validate_dates
from validators.validate_uniqueness import validate_uniqueness

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

    tech = db.relationship("TechnologyModel", back_populates = "projects", secondary = "project_tech")

    points = db.relationship("ProjectPointModel", back_populates = "project")

    institute_id = db.Column(db.ForeignKey("institutes.id"))
    institute = db.relationship("InstituteModel", back_populates = "projects")

    serialize_rules = (
        "-tech.projects",
        "-points.project",
        "-institute.projects",
    )

    # VALIDATE PROJECT NAME
    @validates("name")
    def validate_project_name(self, key, value):
        value = validate_uniqueness(value, self, ProjectModel, key, "Project Model")

        return value

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

