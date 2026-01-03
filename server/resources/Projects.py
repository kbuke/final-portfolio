from resources.BaseResource import BaseResource
from models.ProjectModel import ProjectModel

class ProjectList(BaseResource):
    model = ProjectModel

    field_map = {
        "projectName": "name",
        "projectIntro": "intro",
        "projectImg": "img",
        "projectStartDate": "start_date",
        "projectEndDate": "end_date",
        "webUrl": "web_url",
        "gitUrl": "git_url",
        "instituteId": "institute_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()

class SpecificProject(BaseResource):
    model = ProjectModel

    field_map = {
        "projectName": "name",
        "projectIntro": "intro",
        "projectImg": "img",
        "projectStartDate": "start_date",
        "projectEndDate": "end_date",
        "webUrl": "web_url",
        "gitUrl": "git_url",
        "instituteId": "institute_id"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)