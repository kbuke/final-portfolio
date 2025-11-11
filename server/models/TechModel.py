from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db 

class TechModel(db.Model, SerializerMixin):
    __tablename__ = "tech"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    img = db.Column(db.String, nullable = False, unique = True)
    tech_type = db.Column(db.String, nullable = False)

    # RUN VALIDATIONS
        # Validate Name
    @validates("name")
    def validate_name(self, key, value):
        # 1 - Ensure value is not a boolean
        if isinstance(value, bool):
            raise ValueError("Tech Name not enter a boolean value")
        # 2 - check if a value has been given 
        if value is None or value.strip() == "":
            raise ValueError("Please enter a value for Tech Name")
        
        # 3 - check that the value is a string, or can be converted to a string
        if not isinstance(value, str):
            try:
                value = str(value)
            except ValueError:
                raise ValueError("Tech Name needs to be a string")
        
        # 4 - Check the name is not already registered
        normal_value = value.strip().lower()
        existing_tech = TechModel.query.filter(db.func.lower(TechModel.name) == normal_value).first()
        if existing_tech and existing_tech.id != self.id:
            raise ValueError(f"Tech Name: {value} is already registered on this app.")
        
        return value
    
        # Validate Image
    @validates("img")
    def validate_img(self, key, value):
        # 1 - Ensure the value is not a boolean
        if isinstance(value, bool):
            raise ValueError("Tech Image can not be a boolean value")
        
        # 2 - Ensure a value is given
        if value is None or value.strip() == "":
            raise ValueError("Please enter a value for tech image")

        # 3 - Ensure value is string format
        if not isinstance(value, str):
            try:
                value = str(value)
            except ValueError:
                raise ValueError("Ensure tech-image is a string")
        
        return value
    
        # Validate Tech-Type
    @validates("tech_type")
    def validate_type(self, key, value):
        # 1 - State the possible values
        available_types = ["Frontend", "Backend"]
        if not value in available_types:
            raise ValueError("Tech must be either Frontend or Backend")
        
        return value