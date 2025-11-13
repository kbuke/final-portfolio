from config import api, app

from resources.Tech import Tech, TechList
from resources.Institute import Institute, InstituteList
from resources.Project import Project, ProjectList
from resources.Api import Api, ApiList
from resources.ProjectSection import ProjectSection, ProjectSectionList

api.add_resource(TechList, "/technologies")
api.add_resource(Tech, "/technologies/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

api.add_resource(ApiList, "/apis")
api.add_resource(Api, "/apis/<int:id>")

api.add_resource(ProjectSectionList, "/sections")
api.add_resource(ProjectSection, "/sections/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)