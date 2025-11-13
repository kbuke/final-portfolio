from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

class ApiModel(db.Model, SerializerMixin):
    __tablename__ = "apis"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    img = db.Column(db.String)

    @validates("name")
    def validate_api_name(self, key, value):
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
        existing_institute = ApiModel.query.filter(db.func.lower(ApiModel.name) == normal_value).first()
        if existing_institute and existing_institute.id != self.id:
            raise ValueError(f"Institute {value} already registered on app")
        
        return value