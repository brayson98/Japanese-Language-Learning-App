from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'success': True, 'user': user.username}), 200
    return jsonify({'success': False, 'message': 'Invalid username or password'}), 400


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        data = request.get_json()  
        username = data.get('username')
        password1 = data.get('password1')
        password2 = data.get('password2')

        user = User.query.filter_by(username=username).first()
        if user:
            return {'message': 'Username already exists', 'success': False}, 400
        elif len(username) < 4:
            return {'message': 'Username must be greater than 3 characters', 'success': False}, 400
        elif password1 != password2:
            return {'message': 'Passwords do not match', 'success': False}, 400
        elif len(password1) < 5:
            return {'message': 'Password must be greater than 4 characters', 'success': False}, 400
        else:
            new_user = User(username=username, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'Account created successfully', 'success': True}, 201
