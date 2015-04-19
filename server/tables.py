from app import db

class Users(db.Model):


class Clients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sid = db.Column(db.String(30), unique=True)
    browser = db.Column(db.String(80), unique=False)
    browserVersion = db.Column(db.String(80), unique=False)
    language = db.Column(db.String),
    platform = db.Column(db.String)

    def __repr__(self):
        return '<User %r>' % self.username
