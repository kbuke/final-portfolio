from models.InstituteModel import InstituteModel

from resources.BaseResource import BaseResource

class InstituteList(BaseResource):
    model = InstituteModel

    field_map = {
        "instituteName": "name",
        "instituteImg": "img",
        "instituteStartDate": "start_date",
        "instituteEndDate": "end_date"
    }

    def get(self):
        return self.get_all()

    def post(self):
        return self.create_instance()

            
class Institute(BaseResource):
    model = InstituteModel

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)