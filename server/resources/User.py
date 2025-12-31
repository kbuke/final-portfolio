from resources.BaseResource import BaseResource
from models.UserModel import UserModel

class SpecificUser(BaseResource):
    model = UserModel

    field_map = {
        "name": "name",
        "intro": "intro",
        "cv": "cv",
        "email": "email",
        "password": "password_hash"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)