from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

from validators.validate_email import validate_email
from validators.validate_string import validate_string

class EmailModel(db.Model, SerializerMixin):
    __tablename__ = "emails"

    id = db.Column(db.Integer, primary_key = True)
    email_subject = db.Column(db.String, nullable = False)
    email_message = db.Column(db.String, nullable = False)
    sender_email = db.Column(db.String, nullable = False)
    recipient_email = db.Column(db.String, nullable = False)

    @validates("sender_email", "recipient_email")
    def validate_emails(self, key, value):
        if not isinstance(value, str):
            raise ValueError("Email must be a string")
        
        value = validate_email(value)
        return value
    
    @validates("email_subject", "email_message")
    def validate_email_info(self, key, value):
        value = validate_string(value, key)

        return value

