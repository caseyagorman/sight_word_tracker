import os
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request)
from flask_restful import Resource, Api, reqparse
from model import Student, Word, StudentWord, connect_to_db, db
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

app.secret_key = "ABC"


@app.route("/")
@cross_origin()
def index():
    return render_template('index.html')


@app.route("/api/students/")
@cross_origin()
def get_students():
    students = Student.query.all()
    student_list = []
    for student in students:
        student = {
            'student_id': student.student_id,
            'fname': student.fname,
            'lname': student.lname,
            'grade': student.grade
        }
        student_list.append(student)
    students = jsonify(student_list)
    return students


@app.route("/api/add-student", methods=['POST'])
@cross_origin()
def add_student():
    print("hello!")
    data = request.get_json()
    print(data)
    fname = data.get('fname')
    lname = data.get('lname')
    grade = data.get('grade')
    new_student = Student(fname=fname,  lname=lname, grade=grade)
    db.session.add(new_student)
    db.session.commit()
    return 'student added!'


@app.route("/api/delete-student", methods=['POST'])
@cross_origin()
def delete_student():
    print("goodbye!")
    data = request.get_json()
    print(data)
    fname = data.get('fname')
    student_to_delete = Student.query.filter_by(fname=fname).first()
    db.session.delete(student_to_delete)
    db.session.commit()
    return 'student deleted!'


@app.route("/api/words/")
@cross_origin()
def get_words():
    words = Word.query.all()
    word_list = []
    for word in words:
        word = {
            'word_id': word.word_id,
            'word': word.word
        }
        word_list.append(word)
    words = jsonify(word_list)
    return words


@app.route("/api/add-word", methods=['POST'])
@cross_origin()
def add_word():
    data = request.get_json()
    word = data.get('word')
    new_word = Word(word=word)
    db.session.add(new_word)
    db.session.commit()
    return 'word added!'


@app.route("/api/delete-word", methods=['POST'])
@cross_origin()
def delete_word():
    print("goodbye!")
    data = request.get_json()
    word = data.get('word')
    word_to_delete = Word.query.filter_by(word=word).first()
    db.session.delete(word_to_delete)
    db.session.commit()
    return 'word deleted!'


@app.route("/api/add-word-to-student", methods=["POST"])
@cross_origin()
def add_word_to_student():
    data = request.get_json()
    word = data.get('word')
    fname = data.get('fname')
    lname = data.get('lname')
    student = Student.query.filter_by(fname=fname, lname=lname).first()
    word = Word.query.filter_by(word=word).first()
    # Is there an alternative to doing two queries here? I feel like it has to be
    # two since I haven't created anything yet and my understanding is a joinedload
    # is for querying an existing record?
    new_student_word = StudentWord(
        word_id=word.word_id, student_id=student.student_id)
    db.session.add(new_student_word)
    db.session.commit()

    return 'student word added!'


@app.route("/api/details/<student>")
@cross_origin()
def student_detail(student):
    """Show student detail"""
    student_object = Student.query.filter_by(student_id=student).first()
    words = StudentWord.query.filter_by(
        student_id=student).options(db.joinedload('words')).all()

    word_list = []
    for word in words:
        word = {
            'word_id': word.words.word_id,
            'word': word.words.word
        }
        word_list.append(word)

    student_object = {
        'student_id': student_object.student_id,
        'fname': student_object.fname,
        'lname': student_object.lname,
        'grade': student_object.grade
    }

    return jsonify([student_object, word_list])


if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
