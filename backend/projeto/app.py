from flask import Flask, request
from config.config import Config
from extension.extensao import db
from flask_cors import CORS

def init_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app, 
         supports_credentials=True, 
         resources={r"/*": {
            "origins": ["http://localhost:8080", "http://localhost:8081"]
    }})

    from blueprints.cadastro_bp import cadastro_bp

    app.register_blueprint(cadastro_bp, url_prefix='/cadastrar')

    return app

app = init_app()

