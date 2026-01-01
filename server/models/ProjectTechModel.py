from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

from validators.validate_instance_exists import validate_instance_exists
from validators.validate_unique_pair import validate_unique_pair
from validators.validate_id_int import validate_id_int

from models.ProjectModel import ProjectModel
from models.TechnologyModel import TechnologyModel

class ProjectTechModel(db.Model, SerializerMixin):
    __tablename__ = "project_tech"

    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.ForeignKey("projects.id"), nullable = False)
    tech_id = db.Column(db.ForeignKey("technologies.id"), nullable = False)

    @validates("project_id")
    def validate_project_id(self, key, value):
        value = validate_id_int(value, "project_id")
        validate_instance_exists(ProjectModel, value, "Project")
        return value

    @validates("tech_id")
    def validate_tech_id(self, key, value):
        value = validate_id_int(value, "tech_id")
        validate_instance_exists(TechnologyModel, value, "Technology")
        return value
    
    def validate_unique(self):
        validate_unique_pair(
            self, ProjectTechModel, 
            project_id = self.project_id,
            tech_id = self.tech_id
        )