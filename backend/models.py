from . import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    vocabulary = db.relationship('Vocabulary', cascade="all, delete-orphan")

class Vocabulary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), nullable=False)
    meaning = db.Column(db.String(200), nullable=False)
    example = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))