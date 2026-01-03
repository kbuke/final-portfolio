from flask import session
from flask_restful import Resource

class Logout(Resource):
    def delete(self):
        user_id = session.get("user_id")
        if user_id:
            session.pop("user_id")
            return{}, 204
        return {"error": "Unauthorized"}, 401