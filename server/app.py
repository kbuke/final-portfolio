from config import app, api, db

from resources.User import SpecificUser, UserList
from resources.Technology import TechnologyList, SpecificTechnology
from resources.Projects import ProjectList, SpecificProject
from resources.ProjectTech import ProjectTechList, SpecificProjectTech
from resources.ProjectPoints import ProjectPointsList, SpecificProjectPoints
from resources.Socials import SocialsList, SpecificSocial
from resources.Institute import InstituteList, SpecificInstitute
from resources.Email import EmailList

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

api.add_resource(SocialsList, "/socials")
api.add_resource(SpecificSocial, "/socials/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(SpecificInstitute, "/institutes/<int:id>")

api.add_resource(EmailList, "/emails")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)