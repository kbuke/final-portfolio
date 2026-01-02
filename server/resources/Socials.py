from resources.BaseResource import BaseResource
from models.SocialsModel import SocialsModel

class SocialsList(BaseResource):
    model = SocialsModel

    field_map = {
        "socialsName": "social_name",
        "socialUrl": "url"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificSocial(BaseResource):
    model = SocialsModel

    field_map = {
        "socialsName": "social_name",
        "socialUrl": "url"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)