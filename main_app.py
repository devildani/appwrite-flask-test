
# -*- coding: utf-8 -*-
"""
Created on Thu Sep 24 19:00:16 2020

@author: danip
"""

from flask import render_template, redirect, url_for, flash, request, send_file, Flask, make_response, abort, jsonify, current_app
from itsdangerous import URLSafeTimedSerializer
# from db_operations import db, update_db_user_info, database
from sentry_sdk.integrations.flask import FlaskIntegration
from flask_cors import CORS, cross_origin

from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.avatars import Avatars
from appwrite.services.teams import Teams

client = Client()


(client
  .set_endpoint('https://localhost:5858/v1') # Your API Endpoint
  .set_project('60826fd53aa70') # Your project ID
  .set_key('0c8ea3659859b3c3c23e5b35644d4c07240f5356182c50acd37571c3144a1f91a55e4b541a8860734662238050a457f22cf803d721eb457352026f215e50234fe246975811ac03de59863128bb23c7153cdee01b7c2ed348f0e3c208faf22fac69777a54bdb2e60f77824dfa07d8f41c6f87355abe392c3938629de780a15f71') # Your secret API key
)

teams = Teams(client)

users = Users(client)

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/add-team")
def add_team():
    # result = users.get_sessions('6082912bc4797')

    # result = teams.create_membership('608295cc1e2f3', 'danipratik91@gmail.com', ["meta"], 'https://clientlist.co')

    return render_template("add-team.html")


@app.route("/create-team")
def create_team():
    # result = users.get_sessions('6082912bc4797')
    
    # result = teams.create('Test_102')

    return render_template("create-team.html")

if __name__=="__main__":
    app.run(debug=True)


