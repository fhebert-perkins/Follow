from flask import Flask, session, redirect, url_for, request
from flask.ext.sqlalchemy import SQLAlchemy
from crossdomain import crossdomain
import os
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.secret_key = os.urandom.encode('base_64')
db = SQLAlchemy(app)

@app.route('/admin')
def admin():
    if not session.get('logged_in'):
        redirect(url_for('login'))
    return 'admin panel'

@app.route('/login')
def login():
    if session.get('logged_in'):
        redirect(url_for('admin'))
    return 'login page'


@app.route('/verify', methods=['POST'])
@crossdomain(origin='*')
def verify():
    cid = request.form['cid']
    Clients(sid=cid,
            browser=request.form['bname'],
            browserVersion = request.form['version'],
            language = request.form['language'],
            platform = request.form['platform']).save()
    return 'logged'

@app.route('/data', methods=['POST'])
@crossdomain(origin='*')
def data():
    print request.form['cid']
    return 'derp'
if __name__ == '__main__':
    app.run(debug=True)
