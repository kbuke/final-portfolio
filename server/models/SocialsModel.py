from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from validators.validate_string import validate_string
from validators.validate_uniqueness import validate_uniqueness

from config import db

class SocialsModel(db.Model, SerializerMixin):
    __tablename__ = "socials"

    id = db.Column(db.Integer, primary_key = True)
    social_name = db.Column(db.String, nullable = False, unique = True)
    url = db.Column(db.String, nullable = False, unique = True)

    @validates("social_name", "url")
    def validate_socials(self, key, value):
        value = validate_string(value, key)

        value = validate_uniqueness(value, self, SocialsModel, key, "Socials Model")

        return value