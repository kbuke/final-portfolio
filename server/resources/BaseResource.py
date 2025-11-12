from flask import make_response, session, request
from flask_restful import Resource

from config import db

class BaseResource(Resource):
    model = None 

    # GET all instances of a model
    def get_all(self):
        records = [record.to_dict() for record in self.model.query.all()]
        return records, 200 
    
    # GET specific instance of a model
    def get_specific(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if record:
            return make_response(record.to_dict(), 200)
        else:
            return{"error": f"{self.model.__name__} {id} not found"}, 404
    
    # POST new instance to model
    def create_instance(self):
        data = request.get_json()

        if not data:
            return {"error": "Missing JSON data"}, 404 
        
        mapped_data = {}
        for key, value in data.items():
            mapped_key = self.field_map.get(key, key)
            mapped_data[mapped_key] = value
        try:
            new_record = self.model(**mapped_data)
            db.session.add(new_record)
            db.session.commit()
            return new_record.to_dict(), 201 
        except ValueError as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400
    
    # PATCH instance
    def patch_specific(self, id):
        record = self.model.query.filter(self.model.id == id).first()

        data = request.get_json()

        if record:
            try:
                for attr in data:
                    setattr(record, attr, data[attr])
                db.session.add(record)
                db.session.commit()
                return make_response(record.to_dict(), 202)
            except ValueError as e:
                db.session.rollback()
                return {"error": [str(e)]}
        else:
            return {"error": f"{self.model.__name__} {id} is not regitsered on this app"}, 404
    
    # DELETE instance
    def delete_instance(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if record:
            db.session.delete(record)
            db.session.commit()
            return{"message": f"{self.model.__name__} {id} deleted"}, 200
        else:
            return {"error": f"{self.model.__name__} {id} not found"}, 404
        