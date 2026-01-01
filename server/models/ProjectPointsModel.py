from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from validators.validate_id_int import validate_id_int
from validators.validate_instance_exists import validate_instance_exists

from models.ProjectModel import ProjectModel

from config import db 

class ProjectPointModel(db.Model, SerializerMixin):
    __tablename__ = "project_points"

    id = db.Column(db.Integer, primary_key = True)
    point = db.Column(db.String, nullable = False)

    project_id = db.Column(db.ForeignKey("projects.id"))
    project = db.relationship("ProjectModel", back_populates = "points")

    serialize_rules = (
        "-project",
    )

    @validates("project_id")
    def validate_project_id(self, key, value):
        value = validate_id_int(value, key)

        value = validate_instance_exists(ProjectModel, value, "Project")

        return value
