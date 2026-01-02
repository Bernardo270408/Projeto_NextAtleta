from flask import Blueprint, request, jsonify

login_bp = Blueprint("login", __name__)

@login_bp.route('/')
def login():
    data = request.get_json()
    print(" \n___________________ JSON LOGIN  ___________________________\n")
    print(data)
    print(" \n___________________________________________________________\n")

    return jsonify("erro"), 404