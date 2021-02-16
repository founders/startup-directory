import json
from flask import Flask, request, jsonify
from pymongo import Connection

app = Flask(__name__)

c = Connection(host='db', port=27017)
c.test_database

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8000', debug=True)