from config import app, api, db

from resources.User import SpecificUser

api.add_resource(SpecificUser, "/users/<int:id>")



if __name__ == "__main__":
    app.run(port = 5555, debug = True)