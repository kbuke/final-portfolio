from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

class ReferenceModel(db.Model, SerializerMixin):
    __tablename__ = "references"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    position = db.Column(db.String, nullable = False)
    rating = db.Column(db.Integer, nullable = False)
    review = db.Column(db.String, nullable = False)
    approved = db.Column(db.Boolean, default = False)

    # VALIDATIONS
        # validate rating
    @validates("rating")
    def validate_rating(self, key, value):
        # 1 - Check value is not a boolean, or none
        if isinstance(value, bool) or value is None:
            raise ValueError("Please enter a valid value")
        
        # 2 - Check if the value is not a integer that it can be converted to one
        if not isinstance(value, int):
            try:
                value = int(value)
            except:
                raise ValueError("Please enter an integer value")
        
        # 3 - Ensure value is between 1 and 5
        if value < 1 or 5 < value:
            raise ValueError("Value must be between 1 and 5")

        return value
    
        # validate review
    @validates("review")
    def validate_review(self, key, value):
        # 1 - check a value has been given and that it is not a boolean
        if isinstance(value, bool) or value is None or value.strip() == "":
            raise ValueError("Please enter a valid value")
        
        # 2 - check if it is not a string that it can be converted to one
        if not isinstance(value, str):
            try:
                value = str(value)
            except:
                raise ValueError("Value must be string")
        
        # 3 - check the word count is between 10 and 100 words
        word_count = len(value.split())
        if word_count < 10:
            raise ValueError("Please ensure review is atleast 10 words long")
        if word_count > 50:
            raise ValueError("Please ensure review does not exceed 50 words")
        
        return value

