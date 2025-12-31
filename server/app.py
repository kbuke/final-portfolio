from config import app, api, db

from resources.User import SpecificUser
from resources.Technology import TechnologyList, SpecificTechnology
from resources.Projects import ProjectList, SpecificProject

api.add_resource(SpecificUser, "/users/<int:id>")

api.add_resource(TechnologyList, "/technologies")
api.add_resource(SpecificTechnology, "/technologies/<int:id>")

api.add_resource(ProjectList, "/projects")
api.add_resource(SpecificProject, "/projects/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)