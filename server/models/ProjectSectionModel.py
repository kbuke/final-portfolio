from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

class ProjectSectionModel(db.Model, SerializerMixin):
    __tablename__ = "project-sections"

    id = db.Column(db.Integer, primary_key = True)
    heading = db.Column(db.String, nullable = False)
    text = db.Column(db.String, nullable = False)
    img_1 = db.Column(db.String, nullable = True)
    img_2 = db.Column(db.String, nullable = True)

    