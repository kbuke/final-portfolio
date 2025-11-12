from config import api, app

from resources.Tech import Tech, TechList
from resources.Institute import Institute, InstituteList

api.add_resource(TechList, "/technologies")
api.add_resource(Tech, "/technologies/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)