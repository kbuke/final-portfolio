from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

from validators.validate_uniqueness import validate_uniqueness

class TechnologyModel(db.Model, SerializerMixin):
    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    logo = db.Column(db.String, nullable = False, unique = True)
    tech_type = db.Column(db.String, nullable = False)

    projects = db.relationship("ProjectModel", back_populates = "tech", secondary = "project_tech")

    serialize_rules = (
        "-projects.tech",
    )

    @validates("name")
    def validate_tech_name(self, key, value):
        value = validate_uniqueness(value, self, TechnologyModel, key, "Tech Name")
        return value

