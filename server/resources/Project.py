from models.ProjectModel import ProjectModel

from resources.BaseResource import BaseResource

class ProjectList(BaseResource):
    model = ProjectModel

    field_map = {
        "projectName": "name",
        "projectImg": "img",
        "projectVideo": "video",
        "projectIntro": "intro",
        "projectStartDate": "start_date",
        "projectEndDate": "end_date",
        "gitLink": "git_link",
        "webLink": "web_link",
        "instituteId": "institute_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()
    
class Project(BaseResource):
    model = ProjectModel

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)
    
