from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

from models.ProjectModel import ProjectModel

class ProjectPointModel(db.Model, SerializerMixin):
    __tablename__ = "points"

    id = db.Column(db.Integer, primary_key = True)
    point = db.Column(db.String, nullable = False)

    # RELATIONS
        # Project relationship
    project_id = db.Column(db.ForeignKey("projects.id"))
    project = db.relationship("ProjectModel", back_populates = "points")

    serialize_rules = (
        "-project.points",
        "-project.institute",
        "-project.sections",
    )

    # VALIDATIONS
    @validates("point")
    def validate_point(self, key, value):
        # 1 - ensure the value is not null or an empty string or a boolean
        if isinstance(value, bool) or value is None or value.strip() == "":
            raise ValueError("Please enter a valid project point")
        
        # 2 - Check if it is not a string, whether it can be converted
        if not isinstance(value, str):
            try:
                value = str(value)
            except:
                raise ValueError("Please enter a valid string")
        
        return value
    
    @validates("project_id")
    def validate_project(self, key, value):
        # 1 - Ensure valid id type
        if isinstance(value, bool) or value is None:
            raise ValueError("Please enter a value")
        
        if not isinstance(value, int):
            try:
                value = int(value)
            except:
                raise ValueError("Please enter a vaild id number")
        
        # 2 - Ensure project exists
        existing_project = ProjectModel.query.filter(ProjectModel.id == value).first()
        if not existing_project:
            raise ValueError(f"Project {value} is not registered on the app")
        
        # 3 - Ensure the point doesnt exist for the project
        if hasattr(self, "point") and self.point:
            existing_point = ProjectPointModel.query.filter(
                db.func.lower(ProjectPointModel.point) == self.point.lower(),
                ProjectPointModel.project_id == value
            ).first()

            if existing_point and existing_point.id != self.id:
                raise ValueError(f"The point {self.point} already exists for project: {value}")
            
        return value