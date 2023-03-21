import os
import psycopg2
import logging
import json
import ast
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

def check_attr(access, attr):
    ignore = ['or', 'and', '(', ')', '))']
    attr = ast.literal_eval(attr)
    for a in range(len(access)):
        if access[a] not in ignore:
            if access[a] in attr:
                access[a] = 'True'
            else:
                access[a] = 'False'    
    return eval(' '.join(access))

def send_phr(id, cipher, access):
    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT * FROM attributes WHERE id != %s',
                (id,)
                )
    conn.commit()
    for record in cur.fetchall():
        rec_id = record[0]
        rec_attr = record[1]
        if check_attr(access, rec_attr):
            cur.execute('SELECT EXISTS (SELECT * FROM inbox WHERE id = %s AND sender = %s)',
                (rec_id, id,)
                )
            conn.commit()
            if cur.fetchall[0][0]:
                cur.execute('UPDATE inbox SET ciphertext = (%s) WHERE id = %s AND sender = %s',
                (cipher, rec_id, id)
                )
                conn.commit()
            else:
                cur.execute('INSERT INTO inbox (id, ciphertext, sender) VALUES (%s, %s, %s)',
                (rec_id, cipher, id)
                )
                conn.commit()  

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
    cur.execute('INSERT INTO attributes (id, attribute)'
        'VALUES (%s, %s)',
        (id, str(attributes))
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

    if user[0][0]:
        response_body = {
            "fname": user[0][0],
            "lname": user[0][1]
        }
    else:
        response_body = {"fname": 'null', "lname": 'null'}

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
    cipher = enc.encrypt(json.dumps(request.json), '%s'%id)

    # If record doesnt already exist insert/create else update
    if exists[0][0] != True:
        cur.execute('INSERT INTO phr (id, ciphertext)'
            'VALUES (%s, %s)',
            (id, cipher)
            )
        conn.commit()  
    else:
        cur.execute('UPDATE phr SET ciphertext = (%s) WHERE id = %s',
            (cipher, id)
            )
        conn.commit()

    cur.close()
    conn.close()

    response_body = {
            "msg": "PHR recieved :)"   
    }

    return response_body


@api.route('/access', methods=["POST"])
@jwt_required()
def show_access():
    #access_list = request.json.get("list", None)

    #id = request.json.get("id", None)
    id = 2
    access_list = ['(', '2', 'or', '(', 'b', 'or', 'f', '))']
    # Connect to database
    conn = get_db_connection()
    cur = conn.cursor()

    # Get user first and last name
    cur.execute('SELECT EXISTS (SELECT id FROM phr WHERE id = %s)',
                (id,)
                )
    conn.commit()
    
    exists = cur.fetchall()
     # Get cyphertext if user phr exists
    if exists[0][0]:
        cur.execute('SELECT ciphertext FROM phr WHERE id = %s',
                (id,)
                )
        conn.commit()
        cipher = cur.fetchall()
        ciphertext = bytes(cipher[0][0])

        # Create an attribute list of just user id
        attr = [id]

        # Decrypt ciphertext using just user id
        plain = enc.decrypt(enc.keygen(attr), ciphertext).decode()
        # Catch error if access tree is structured wrong
        try:
            new_ciphertext = enc.encrypt(plain, str(' '.join(access_list)))
            #new_ciphertext = "test"
            cur.execute('UPDATE phr SET ciphertext = (%s) WHERE id = %s',
                (new_ciphertext, id)
            )
            conn.commit()
            send_phr(id, new_ciphertext, access_list)
        except TypeError:
            return {"msg": "Access List was structured incorrectly"}, 400

    cur.close()
    conn.close()

    response_body = {
        "msg": "PHR Access Updated"
    }

    return response_body