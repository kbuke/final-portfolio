from resources.BaseResource import BaseResource
from models.ProjectTechModel import ProjectTechModel

class ProjectTechList(BaseResource):
    model = ProjectTechModel

    field_map = {
        "projectId": "project_id",
        "techId": "tech_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()
    
class SpecificProjectTech(BaseResource):
    model = ProjectTechModel

    field_map = {
        "projectId": "project_id",
        "techId": "tech_id"
    }

    def get(self, id):
        return self.get_specific(id)

    def delete(self, id):
        return self.delete_instance(id)    