from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from datetime import date, datetime

from config import db

from validators.validate_dates import validate_dates
from validators.validate_uniqueness import validate_uniqueness
from validators.validate_id_int import validate_id_int
from validators.validate_instance_exists import validate_instance_exists

from models.InstituteModel import InstituteModel

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

    @validates("institute_id")
    def validate_institute(self, key, value):
        value = validate_id_int(value, key)
        value = validate_instance_exists(InstituteModel, value, "Institute")

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
    
    def validate_institute_dates(self):
        start_date = self.start_date
        end_date = self.end_date
        
        institute_id = self.institute_id
        institute = InstituteModel.query.filter(InstituteModel.id == institute_id).first()
        institute_start_date = institute.start_date
        institute_end_date = institute.end_date

        if start_date < institute_start_date:
            raise ValueError("Must have started project after starting institute")
        
        if institute_end_date and start_date > institute_end_date:
            raise ValueError("Must have finished the project before finishing at the institute")
        
        if end_date and end_date < institute_start_date:
            raise ValueError("Project must have finished after starting at the institute")
        
        if end_date and end_date > institute_end_date:
            raise ValueError("Project must have ended before finishing at the institute")
        
        if not end_date and institute_end_date:
            raise ValueError("You must have finished the project if you have finished at the institute")