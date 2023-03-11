import os
import psycopg2
import logging
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from abe import abe

api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "9b73f2a1bdd7ae163444473d29a6885ffa22ab26117068f72a5a56a74d12d1fc"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)
logging.basicConfig(level=logging.DEBUG)
enc = abe()

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
    response = {
        "access_token":access_token, 
        "id": user[0][0]
    }
    return response

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    #logging.debug(test())
    return response

@api.route('/profile', methods=["POST"])
@jwt_required()
def my_profile():
    # Get values
    id = request.json.get("id", None)

    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    # Get user first and last name
    cur.execute('SELECT fname, lname FROM users WHERE id = %s',
                (id,)
                )
    conn.commit()
    
    user = cur.fetchall()

    # TODO: check if PHR exists, if so: fetch, decrypt, send back

    cur.close()
    conn.close()

    response_body = {
        "fname": user[0][0],
        "lname": user[0][1]
    }

    return response_body

@api.route('/phr', methods=["POST"])
def update_phr():
    # Get values
    id = request.json.get("id", None)

    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    # Get user first and last name
    cur.execute('SELECT EXISTS (SELECT id FROM phr WHERE id = %s)',
                (id,)
                )
    conn.commit()
    
    exists = cur.fetchall()
    cipher = json.dumps(enc.encrypt('Hello World!', '%s or None'%id))
    attr = [id]
    plain = json.dumps(enc.decrypt(enc.keygen(attr), cipher))
    if exists[0][0] != True:
        cur.execute('INSERT INTO phr (id, ciphertext)'
            'VALUES (%s, %s)',
            (id, cipher)
            )
        conn.commit()
        cur.execute('INSERT INTO plain (id, plaintext)'
            'VALUES (%s, %s)',
            (id, plain)
            )
        conn.commit()   
    else:
        cur.execute('UPDATE phr SET ciphertext = (%s) WHERE id = %s',
            (cipher, id)
            )
        conn.commit()
        cur.execute('UPDATE plain SET plaintext = (%s) WHERE id = %s',
            (plain, id)
            )
        conn.commit()

    cur.close()
    conn.close()

    response_body = {
        "msg": "PHR recieved"   
    }

    return response_body


@api.route('/access', methods=["POST"])
@jwt_required()
def show_access():
    accessList = request.json.get("list", None)
    print(accessList)

    response = jsonify({"msg": "Got the list, thx"})

    return response
