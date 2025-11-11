from config import api, app

from resources.Tech import Tech, TechList

api.add_resource(TechList, "/technologies")
api.add_resource(Tech, "/technologies/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)