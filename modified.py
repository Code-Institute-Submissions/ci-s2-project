from pymongo import MongoClient
import os


MONGO_HOST = 'localhost'
MONGO_PORT = 27017

DBS_NAME = os.getenv('MONGO_DB_NAME', 'videogameSales')
COLLECTION_NAME = os.getenv('MONGO_COLLECTION_NAME', 'projects')


connection = MongoClient(MONGO_HOST, MONGO_PORT)
collection = connection[DBS_NAME][COLLECTION_NAME]

ModifiedProjects = connection[DBS_NAME]["ModifiedProjects"]

#Find and change a column value and save in new collection
games = collection.find()

for game in games:
    if game['Developer'] == '':
        game['Developer'] = 'Unknown'
    if game['Developer'] == 2015:
        game['Developer'] = 'Unknown'
    if game['Rating'] == '':
        game['Rating'] = 'N/A'
    ModifiedProjects.save(game)
