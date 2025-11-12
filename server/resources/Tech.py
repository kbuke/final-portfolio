from models.TechModel import TechModel

from resources.BaseResource import BaseResource

class TechList(BaseResource):
    model = TechModel

    field_map = {
        "techName": "name",
        "techImg": "img",
        "techType": "tech_type"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()
    
class Tech(BaseResource):
    model = TechModel

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)