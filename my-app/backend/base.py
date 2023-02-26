import os
import psycopg2
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "9b73f2a1bdd7ae163444473d29a6885ffa22ab26117068f72a5a56a74d12d1fc"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

# method to connect to database
def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn

@api.route('/register', methods=["POST"])
def create_user():
    # Get values
    username   = request.json.get("username", None)
    # TODO : store password as hash in database
    password   = request.json.get("password", None)
    fname      = request.json.get("fname", None)
    lname      = request.json.get("lname", None)
    attributes = request.json.get("attr", None)

    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    # Create new user
    cur.execute('INSERT INTO users (fname, lname)'
            'VALUES (%s, %s) RETURNING ID',
            (fname, lname)
            )
    conn.commit()
    
    # get new user id
    id = cur.fetchone()[0]

    # Create new user
    cur.execute('INSERT INTO login (id, usr, pswd)'
            'VALUES (%s, %s, %s)',
            (id, username, password)
            )
    conn.commit()

    # Store user attrubutes
    for x in attributes:
        cur.execute('INSERT INTO attributes (id, attribute)'
            'VALUES (%s, %s)',
            (id, x)
            )
        conn.commit()
        
    cur.close()
    conn.close()

    response = {"msg": "User Created Succesfully"}
    return response


@api.route('/token', methods=["POST"])
def create_token():
    # Get login credentials
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    # Check if user exists
    cur.execute('SELECT EXISTS (SELECT * FROM login WHERE usr = %s)',
                (username,)
                )
    conn.commit()

    exists = cur.fetchall()
    
    if exists[0][0] != True:
        return {"msg": "User Does Not Exist"}, 401

    # Check if password is right
    cur.execute('SELECT * FROM login WHERE usr = %s',
                (username,)
                )
    conn.commit()
    
    user = cur.fetchall()

    if password != user[0][2]:
        return {"msg": "Wrong Password"}, 401

    access_token = create_access_token(identity=username)
    response = {"access_token":access_token, "id": user[0][0]}
    return response

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/access', methods=["POST"])
@jwt_required()
def show_access():
    accessList = request.json.get("list", None)
    print(accessList)

    response = jsonify({"msg": "Got the list, thx"})

    return response

###############  TEST  #############
@api.route('/profile')
# @jwt_required()
def my_profile():
    response_body = {
        "name": "TEST TEST TEST"
    }

    return response_body