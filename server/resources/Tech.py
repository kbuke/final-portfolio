from flask import make_response, session, request
from flask_restful import Resource

from config import db 

from models.TechModel import TechModel

class TechList(Resource):
    def get(self):
        technologies = [tech.to_dict() for tech in TechModel.query.all()]
        return technologies, 200
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_tech = TechModel(
                    name = json.get("techName"),
                    img = json.get("techImg"),
                    tech_type = json.get("techType")
                )
                db.session.add(new_tech)
                db.session.commit()
                return new_tech.to_dict(), 201 
            except ValueError as e:
                return {"error": [str(e)]}

class Tech(Resource):
    def get(self, id):
        tech = TechModel.query.filter(TechModel.id == id).first()
        if tech:
            return tech.to_dict(), 200 
        else:
            return {"error": f"Tech {id} was not found"}, 404
        
    def patch(self, id):
        tech = TechModel.query.filter(TechModel.id == id).first()

        data = request.get_json()

        breakpoint()

        if tech:
            try:
                for attr in data:
                    setattr(tech, attr, data[attr])
                db.session.add(tech)
                db.session.commit()
                return make_response(tech.to_dict(), 202)
            except ValueError as e:
                return{"error": [str(e)]}
        
        else:
            return{"error": f"Tech {id} not found."}, 404
    
    def delete(self, id):
        tech = TechModel.query.filter(TechModel.id == id).first()

        if tech:
            db.session.delete(tech)
            db.session.commit()
            return {"message": f"Tech {id} deleted."}, 201
        else:
            return {"error": f"Tech {id} not found"}, 404