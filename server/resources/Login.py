from flask import session, request
from flask_restful import Resource

from config import db 

from models.UserModel import UserModel

class Login(Resource):
    def post(self):
        json = request.get_json()

        email = json.get("userEmail")
        password = json.get("userPassword")

        if not email or not password:
            return{"error": "Email and password are required"}, 400
        
        user = UserModel.query.filter(UserModel.email == email).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200 
        return {"error": "Invalid email or password"}, 401