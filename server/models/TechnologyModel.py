from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class TechnologyModel(db.Model, SerializerMixin):
    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    logo = db.Column(db.String, nullable = False, unique = True)
    tech_type = db.Column(db.String, nullable = False, unique = True)