from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db 

class TechModel(db.Model, SerializerMixin):
    __tablename__ = "tech"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    img = db.Column(db.String, nullable = False, unique = True)
    tech_type = db.Column(db.String, nullable = False)

    @validates("name")
    def validate_name(self, key, value):
        # 1 - Ensure value is not a boolean
        if isinstance(value, bool):
            raise ValueError("Can not enter a boolean value")
        # 2 - check if a value has been given 
        if value is None or value.strip() == "":
            raise ValueError("Please enter a value")
        
        # 3 - check that the value is a string, or can be converted to a string
        if not isinstance(value, str):
            try:
                value = str(value)
            except ValueError:
                raise ValueError("Name needs to be a string")
        
        # 4 - Check the name is not already registered
        existing_tech = TechModel.query.filter(TechModel.name == value).first()
        if existing_tech and existing_tech.id != self.id:
            raise ValueError(f"{value} is already registered on this app.")
        
        return value