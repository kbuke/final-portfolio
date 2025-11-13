from resources.BaseResource import BaseResource
from models.ProjectSectionModel import ProjectSectionModel

class ProjectSectionList(BaseResource):
    model = ProjectSectionModel

    field_map = {
        "sectionHeading": "heading",
        "sectionText": "text",
        "sectionImg1": "img_1",
        "sectionImg2": "img_2"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.create_instance()
    
class ProjectSection(BaseResource):
    model = ProjectSectionModel
    
    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)