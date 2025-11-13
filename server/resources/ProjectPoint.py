from resources.BaseResource import BaseResource
from models.ProjectPointModel import ProjectPointModel

class ProjectPointList(BaseResource):
    model = ProjectPointModel

    field_map = {
        "projectPoint": "point",
        "projectId": "project_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()
    
class ProjectPoint(BaseResource):
    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)
