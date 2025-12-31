from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class UserModel(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    intro = db.Column(db.String, nullable = False)
    cv = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)

    # VALIDATE PASSWORD
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write-only attribute")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __init__(self, **kwargs):
        password = kwargs.pop("password_hash", None)
        super().__init__(**kwargs)

        if password:
            self.password_hash = password
