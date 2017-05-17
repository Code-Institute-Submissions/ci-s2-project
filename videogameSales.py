from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os


app = Flask(__name__)

MONGODB_URI = os.getenv('MONGODB_URI')
DBS_NAME = os.getenv('MONGO_DB_NAME','videogameSales')
COLLECTION_NAME = os.getenv('MONGO_COLLECTION_NAME','ModifiedProjects')

MONGOD_URI = os.getenv('MONGOD_URI')

#MONGODB_HOST = 'localhost'
#MONGODB_PORT = 27017

FIELDS = {'Name': True, 'Platform': True, 'Year_of_Release': True, 'Genre': True, 'Publisher': True,
          'Global_Sales': True, 'Developer': True,'_id': False}



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/index.html")
def index2():
    return render_template("index.html")

@app.route("/portfolio.html")
def portfolio():
    return render_template("portfolio.html")

@app.route("/videogamesales/ModifiedProjects")
def videogamesales_projects():
    connection = MongoClient(MONGODB_URI)
    #connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=16719)
    json_projects = list(projects)

    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)