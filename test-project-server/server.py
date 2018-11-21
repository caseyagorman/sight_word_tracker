import os
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request)
from flask_restful import Resource, Api, reqparse
from model import Student, connect_to_db, db
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

app.secret_key = "ABC"


@app.route("/")
@cross_origin()
def index():
    return render_template('index.html')


@app.route("/api/students/")
@cross_origin()
def get_students():
    student = Student.query.get(1)
    student = jsonify({
        'student_id': student.student_id,
        'name': student.name
    })
    return student


if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
