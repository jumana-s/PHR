import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "9b73f2a1bdd7ae163444473d29a6885ffa22ab26117068f72a5a56a74d12d1fc"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)


@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@api.route('/profile')
# @jwt_required()  UNCOMMENT REMEMBER OKKKK
def my_profile():
    response_body = {
        "name": "TEST TEST TEST"
    }

    return response_body

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response