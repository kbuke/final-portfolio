from flask import make_response, session, request
from flask_restful import Resource

from config import db

from models.InstituteModel import InstituteModel

class InstituteList(Resource):
    def get(self):
        institutes = [institute for institute in InstituteModel.query.all()]
        return institutes, 200 
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_institute = InstituteModel(
                    name = json.get("instituteName"),
                    img = json.get("instituteImg"),
                    start_date = json.get("instituteStartDate"),
                    end_date = json.get("instituteEndDate")
                )
                db.session.add(new_institute)
                db.session.commit()
                return new_institute.to_dict(), 201
            except ValueError as e:
                return {"error": [str(e)]}
            
class Institute(Resource):
    def get(self, id):
        institute = InstituteModel.query.filter(InstituteModel.id == id).first()
        if institute:
            return institute.to_dict(), 200
        else:
            return {"error": f"Institute {id} not found"}, 404
        
    def patch(self, id):
        institute = InstituteModel.query.filter(InstituteModel.id == id).first()

        data = request.get_json()

        if institute:
            try:
                for attr in data:
                    setattr(institute, attr, data[attr])
                db.session.add(institute)
                db.session.commit()
                return make_response(institute.to_dict(), 202)
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Institute with id: {id} not found"}
    
    def delete(self, id):
        institute = InstituteModel.query.filter(InstituteModel.id == id).first()
        if institute:
            db.session.delete(institute)
            db.session.commit()
            return {"message": f"Institute {id} deleted"}
        else:
            return {"error": f"Institue {id} not found"}, 404
