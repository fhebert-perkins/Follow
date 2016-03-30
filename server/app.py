from flask import Flask, session, redirect, url_for, request
from flask.ext.sqlalchemy import SQLAlchemy
from crossdomain import crossdomain
import os
import json
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.secret_key = os.urandom(16)
db = SQLAlchemy(app)

@app.route("/<clientID>/events", methods=["POST"])
@crossdomain('*')
def events(clientID):
    payload = request.form.get("payload")
    if payload != None:
        payload = json.loads(payload)

    else:
        return ""
@app.route("/<clientID>/getID")
@crossdomain('*')
def getid(clientID):
    return "ugahboogah"

if __name__ == "__main__":
    app.run(debug=True)
