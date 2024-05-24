#!/usr/bin/python3
"""MAIN APP WITH FLASK"""

from flask import Flask, jsonify, render_template, request, session
from flask_cors import CORS
from sqlalchemy import create_engine
from base_model import Base
from db_operations import DBOperations
from blueprints import main_bp
from api_blueprint import api_bp
from flask_mail import Mail
from flask_login import LoginManager, login_user
from datetime import timedelta
import logging


# Create Flask app instance
app = Flask(__name__)
app.config["SECRET_KEY"] = "demo_dev_pwd"
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "antoniofdjs@gmail.com"
app.config["MAIL_PASSWORD"] = "syhk sijd eoli tgba"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=15) # Session expires in 15 seconds
app.register_blueprint(main_bp)
app.register_blueprint(api_bp, url_prefix='/api')
mail = Mail(app)
login_manager = LoginManager(app)
CORS(app)

engine = create_engine('postgresql://demo_dev:demo_dev_pwd@demodb.ctossyay6vcz.us-east-2.rds.amazonaws.com/postgres')
Base.metadata.bind = engine


@login_manager.user_loader
def load_user(user_id):
    return DBOperations().search('User', user_id)

@app.before_request
def keep_session_alive():
    session.modified = True  # Before requests, keep alive session if it hasnt expired


@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/<path:filename>")
def serve_static(filename):
    """Serves static files from the configured static directory, or returns a 404 for unmatched files."""
    try:
        return app.send_static_file(filename)
    except FileNotFoundError:
        # Handle non-existent files gracefully
        return jsonify({"message": "File not found"}), 404



if __name__ == "__main__":
    app.run(debug=True)

