# -*- coding: utf-8 -*-
"""
Created on Fri Apr 23 12:35:22 2021

@author: danip
"""

from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.avatars import Avatars
from appwrite.services.teams import Teams

client = Client()

(client
  .set_endpoint('https://45.79.197.196/v1') # Your API Endpoint
  .set_project('60826fd53aa70') # Your project ID
  .set_key('0c8ea3659859b3c3c23e5b35644d4c07240f5356182c50acd37571c3144a1f91a55e4b541a8860734662238050a457f22cf803d721eb457352026f215e50234fe246975811ac03de59863128bb23c7153cdee01b7c2ed348f0e3c208faf22fac69777a54bdb2e60f77824dfa07d8f41c6f87355abe392c3938629de780a15f71') # Your secret API key
)

teams = Teams(client)

result = teams.list()

result = teams.create_membership('608278d80a78b', 'emaasdasdil@example.com', [], 'https://example.com')

result

result = teams.create('testestet')

result = teams.get('608278d80a78b')

result = teams.update('608278d80a78b', 'asdasdasdasd')

result 

avatars = Avatars(client)

result = avatars.get_credit_card('amex')



users = Users(client)

result = users.create('danipratik91@gmail.com', '7984654654654')

result = users.list()

result 

result = users.get_sessions('60828a747b89f')
result 

result = users.get_logs('60828a747b89f')


import requests

headers = {'x-appwrite-project': '60826fd53aa70',
#           'x-appwrite-key': '0c8ea3659859b3c3c23e5b35644d4c07240f5356182c50acd37571c3144a1f91a55e4b541a8860734662238050a457f22cf803d721eb457352026f215e50234fe246975811ac03de59863128bb23c7153cdee01b7c2ed348f0e3c208faf22fac69777a54bdb2e60f77824dfa07d8f41c6f87355abe392c3938629de780a15f71',
           'content-type': 'application/json',
           'x-sdk-version': 'appwrite:python:0.1.0',}

{'content-type': 'application/json',
 'x-sdk-version': 'appwrite:python:0.1.0', 
 'x-appwrite-project': '60826fd53aa70', 
# 'x-appwrite-key': '0c8ea3659859b3c3c23e5b35644d4c07240f5356182c50acd37571c3144a1f91a55e4b541a8860734662238050a457f22cf803d721eb457352026f215e50234fe246975811ac03de59863128bb23c7153cdee01b7c2ed348f0e3c208faf22fac69777a54bdb2e60f77824dfa07d8f41c6f87355abe392c3938629de780a15f71'
 }

payload = {}
payload['email'] = "dfghjkdanipratik91@gmail.com"
payload['password'] = "asdasdsadasydgasudas"
payload['name'] = ""

import json

resp = requests.post("https://45.79.197.196/v1/account", json=payload, verify=False, headers=headers)

resp.text

resp = requests.post("https://45.79.197.196/v1/account/sessions", json=payload, verify=False, headers=headers)
resp.text

provider = "amazon"

resp = requests.get(f"https://45.79.197.196/v1/account", verify=False, headers=headers)
resp.text


