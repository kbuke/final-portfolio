from config import app, api, db

from resources.User import SpecificUser, UserList
from resources.Technology import TechnologyList, SpecificTechnology
from resources.Projects import ProjectList, SpecificProject
from resources.ProjectTech import ProjectTechList, SpecificProjectTech
from resources.ProjectPoints import ProjectPointsList, SpecificProjectPoints

api.add_resource(UserList, "/users")
api.add_resource(SpecificUser, "/users/<int:id>")

api.add_resource(TechnologyList, "/technologies")
api.add_resource(SpecificTechnology, "/technologies/<int:id>")

api.add_resource(ProjectList, "/projects")
api.add_resource(SpecificProject, "/projects/<int:id>")

api.add_resource(ProjectTechList, "/projecttech")
api.add_resource(SpecificProjectTech, "/projecttech/<int:id>")

api.add_resource(ProjectPointsList, "/points")
api.add_resource(SpecificProjectPoints, "/points/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)