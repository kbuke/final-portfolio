from resources.BaseResource import BaseResource
from models.InstituteModel import InstituteModel

class InstituteList(BaseResource):
    model = InstituteModel

    field_map = {
        "instituteName": "name",
        "instituteLogo": "logo",
        "instituteInfo": "info",
        "instituteStartDate": "start_date",
        "instituteEndDate": "end_date"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()
    
class SpecificInstitute(BaseResource):
    model = InstituteModel

    field_map = {
        "instituteName": "name",
        "instituteLogo": "logo",
        "instituteInfo": "info",
        "instituteStartDate": "start_date",
        "instituteEndDate": "end_date"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)