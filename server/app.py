from flask import Flask, session, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.secret_key = "secret"
db = SQLAlchemy(app)

@app.route("/admin")
def admin():
    if not session.get("logged_in"):
        redirect(url_for("login"))
    return "admin panel"

@app.route("/login")
def login():
    if session.get("logged_in"):
        redirect(url_for("admin"))
    return "login page"


@app.route("/verify", methods=["POST"])
def verify():
    
