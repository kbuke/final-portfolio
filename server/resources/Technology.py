from resources.BaseResource import BaseResource
from models.TechnologyModel import TechnologyModel

class TechnologyList(BaseResource):
    model = TechnologyModel

    field_map = {
        "techName": "name",
        "techLogo": "logo",
        "techType": "tech_type"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificTechnology(BaseResource):
    model = TechnologyModel

    field_map = {
        "techName": "name",
        "techLogo": "logo",
        "techType": "tech_type"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)