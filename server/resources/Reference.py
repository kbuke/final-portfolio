from resources.BaseResource import BaseResource
from models.ReferenceModel import ReferenceModel

class ReferenceList(BaseResource):
    model = ReferenceModel

    field_map = {
        "refereesName": "name",
        "refereesPosition": "position",
        "rating": "rating",
        "review": "review",
        "approved": "approved"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()
    
class Reference(BaseResource):
    model = ReferenceModel

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)