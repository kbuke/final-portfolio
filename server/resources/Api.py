from resources.BaseResource import BaseResource
from models.ApiModel import ApiModel

class ApiList(BaseResource):
    model = ApiModel

    field_map = {
        "apiName": "name",
        "apiImg": "img"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()

class Api(BaseResource):
    model = ApiModel

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)