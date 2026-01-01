from resources.BaseResource import BaseResource
from models.ProjectPointsModel import ProjectPointModel

class ProjectPointsList(BaseResource):
    model = ProjectPointModel

    field_map = {
        "projectPoint": "point",
        "projectId": "project_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificProjectPoints(BaseResource):
    model = ProjectPointModel

    field_map = {
        "projectPoint": "point",
        "projectId": "project_id"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)