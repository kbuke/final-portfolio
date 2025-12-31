from flask import make_response, request
from flask_restful import Resource

from config import db 

class BaseResource(Resource):
    model = None 

    # GET ALL INSTANCES OF MODEL
    def get_all(self):
        records = [record.to_dict() for record in self.model.query.all()]
        return records, 200 
    
    # GET SPECIFIC INSTANCE OF MODEL
    def get_specific(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if record:
            return make_response(record.to_dict(), 200)
        else:
            return{"error": f"{self.model.__name__} {id} not found"}, 404
        
    # CREATE NEW INSTANCE OF MODEL
    def post_instance(self):
        data = request.get_json()

        if not data:
            return{"error": "Missing JSON data"}, 404
        
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
    
    # PATCH INSTANCE
    def patch_instance(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        data = request.get_json()

        if not record:
            return{"error": f"{self.model.__name__} {id} not registered"}, 404
        
        try:
            mapped_data = {}

            for key, value in data.items():
                mapped_key = getattr(self, "field_map", {}).get(key, key)
                mapped_data[mapped_key] = value

            for attr, val in mapped_data.items():
                setattr(record, attr, val)
            
            db.session.commit()
            return make_response(record.to_dict(), 202)
        
        except ValueError as e:
            db.session.rollback()
            return{"error": [str(e)]}, 400 
    
    # DELETE INSTANCE
    def delete_instance(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if record:
            db.session.delete(record)
            db.session.commit()
            return {"message": f"{self.model.__name__} {id} deleted"}, 200
        else:
            return {"error": f"{self.model.__name__} {id} not found."}, 404