from config import app, api, db

from resources.User import SpecificUser
from resources.Technology import TechnologyList, SpecificTechnology

api.add_resource(SpecificUser, "/users/<int:id>")

api.add_resource(TechnologyList, "/technologies")
api.add_resource(SpecificTechnology, "/technologies/<int:id>")



if __name__ == "__main__":
    app.run(port = 5555, debug = True)