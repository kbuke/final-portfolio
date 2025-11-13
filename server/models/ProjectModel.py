from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db 
from datetime import date, datetime

from models.InstituteModel import InstituteModel

class ProjectModel(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    img = db.Column(db.String, nullable = False)
    video = db.Column(db.String, nullable = True)
    intro = db.Column(db.String, nullable = False)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date)
    git_link = db.Column(db.String)
    web_link = db.Column(db.String)

    # RELATIONS
        # Institute the project was created at (one-to-MANY)
    institute_id = db.Column(db.ForeignKey("institute.id"))
    institute = db.relationship("InstituteModel", back_populates = "projects")

    serialize_rules = (
        "-institute.projects",
    )

    # VALIDATIONS
        # validate project name
    @validates("name")
    def validate_project_name(self, key, value):
        # 1 - Check value is not a boolean value
        if isinstance(value, bool):
            raise ValueError("Please do not enter a boolean value")
        
        # 2 - Check that value exists
        if value is None or value.strip() == "":
            raise ValueError("Please enter a valid value.")
        
        # 3 - Check value is a string, or can be converted to a string
        if not isinstance(value, str):
            try:
                value = str(value)
            except ValueError:
                raise ValueError("Please enter a string")
        
        # 4 - Check the institute is not already registerd
        normal_value = value.strip().lower()
        existing_institute = ProjectModel.query.filter(db.func.lower(ProjectModel.name) == normal_value).first()
        if existing_institute and existing_institute.id != self.id:
            raise ValueError(f"Project {value} already registered on app")
        
        return value
    
        # validate project dates
    @validates("start_date", "end_date")
    def validate_dates(self, key, value):
        # 1 - Ensure value is not a boolean
        if isinstance(value, bool) or isinstance(value, int) or isinstance(value, float):
            raise ValueError(f"{key} value can not be a boolean or a number.")
        
        # 2 - Check that start_date is not empty value
        if key == "start_date":
            # ensure the value is not none
            if value is None or value.strip() == "":
                raise ValueError("Please enter a value.")
            # if its not a date value can it be converted to a date?
            if not isinstance(value, date):
                try:
                    value = datetime.strptime(value, "%Y-%m-%d").date()
                except ValueError:
                    raise ValueError("Please enter a valid start-date.")

        # Define values
        start_date = value if key == "start_date" else self.start_date
        end_date = value if key == "end_date" else self.end_date

        # 3 - if end_date exists check that it is of date format if it is then check that it is after start_date
        if key == "end_date" and end_date:
            if not isinstance(end_date, date):
                try:
                    end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

                except:
                    raise ValueError("Please enter a valid end-date.")
            if start_date > end_date:
                raise ValueError(f"Projects end date must be after {start_date}")
            
            return end_date
        
        return value
    
        # validate institute
    @validates("institute_id")
    def validate_institute(self, key, value):
        # 1 - Check value is not a boolean or empty value
        if isinstance(value, bool) or value is None:
            raise ValueError("Please enter valid institute id")
        
        # 2 - Check if value is type string
        if not isinstance(value, int):
            try:
                value = int(value)
            except:
                raise ValueError("Please enter a vald integer")
            
        # 3 - Check institute exists
        existing_institute = InstituteModel.query.filter(InstituteModel.id == value).first()
        if not existing_institute:
            raise ValueError(f"Institute {value} not registered")
        
        # 4 - Define values for instiute
        institute_start_date = existing_institute.start_date
        institute_end_date = existing_institute.end_date
        
        # 5 - Check project is in-line with the institute dates
        if self.start_date <= institute_start_date:
            raise ValueError(f"You must have started project before or on {institute_start_date}")
        
        if (institute_end_date and not self.end_date) or institute_end_date < self.end_date:
            raise ValueError(f"You must have finished project by {institute_end_date}")
        
        return value
        