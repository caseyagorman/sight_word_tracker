import os
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request)
from flask_restful import Resource, Api, reqparse
from model import Student, Word, StudentWord, StudentTestResult, WordTest, connect_to_db, db
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

app.secret_key = "ABC"


@app.route("/")
@cross_origin()
def index():
    return "homepage"


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


@app.route("/api/get-student/")
@cross_origin()
def get_student():
    data = request.get_json()
    fname = data.get('fname')
    student = Student.query.filter_by(fname=fname).first()
    student = {
        'student_id': student.student_id,
        'fname': student.fname,
        'lname': student.lname,
        'grade': student.grade
    }
    student = jsonify(student)
    if student:
        return student
    else:
        return "student does not exist"


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
    lname = data.get('lname')
    student = Student.query.filter_by(fname=fname).first()
    print(student)

    # student_to_delete = StudentWord.query.filter_by(
    #     student_id=student.student_id).options(db.joinedload('students')).all()

    db.session.delete(student)
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


@app.route("/api/unknown-words/<student>")
@cross_origin()
def get_unknown_words(student):
    words = StudentWord.query.filter_by(
        student_id=student).options(db.joinedload('words')).all()
    word_ids = []
    for word in words:
        word_ids.append(word.word_id)
    unknown_words = Word.query.filter(Word.word_id.notin_(word_ids)).all()
    json_word_list = []
    for word in unknown_words:
        word = {
            'word_id': word.word_id,
            'word': word.word
        }
        json_word_list.append(word)
    words = jsonify(json_word_list)
    return words


@app.route("/api/add-word", methods=['POST'])
@cross_origin()
def add_word():
    data = request.get_json()
    new_word = data.get('word')
    print(new_word)
    words = Word.query.all()
    words = list(words)
    for w in words:
        print(w.word)
        if new_word == w.word:
            print("already in database")
            return "already in database"

    print("not in list")
    word = Word(word=new_word)
    db.session.add(word)
    db.session.commit()
    return 'word added!'


@app.route("/api/delete-word", methods=['POST'])
@cross_origin()
def delete_word():
    print("goodbye!")
    data = request.get_json()
    word = data.get('word')
    word = word.get('word')
    print(word)
    word_to_delete = Word.query.filter_by(word=word).first()
    db.session.delete(word_to_delete)
    db.session.commit()
    return 'word deleted!'


@app.route('/api/add-word-to-student', methods=['POST'])
@cross_origin()
def add_word_to_student():
    data = request.get_json()
    fname = data.get('fname')
    lname = data.get('lname')
    words = data.get('words')
    student = Student.query.filter_by(fname=fname, lname=lname).first()
    word_list = Word.query.filter(Word.word.in_(words)).all()
    word_ids = []
    for word in word_list:
        word_ids.append(word.word_id)
    student_word_list = StudentWord.query.options(db.joinedload('students')).filter(
        Student.student_id == student.student_id).filter(
        StudentWord.word_id.in_(word_ids)).all()
    for word in student_word_list:
        if word.students.student_id == student.student_id:
            return "already in database"
    for word in word_list:
        new_student_word = StudentWord(
            word_id=word.word_id, student_id=student.student_id)
        db.session.add(new_student_word)
        db.session.commit()

    return "student words added!"


@app.route('/api/add-word-to-all-students', methods=['POST'])
@cross_origin()
def add_word_to_all_student():
    data = request.get_json()
    print(data)
    word = data.get('word')
    students = StudentWord.query.all()
    word = Word.query.filter_by(word=word).first()
    for student in students:
        new_student_word = StudentWord(
            word_id=word.word_id, student_id=student.student_id)
        db.session.add(new_student_word)
        db.session.commit()

    return 'student word added!'


@app.route("/api/details/<student>")
@cross_origin()
def student_detail(student):
    """Show student detail"""
    student_object = Student.query.filter(
        Student.student_id == student).first()
    student_words = StudentWord.query.filter_by(
        student_id=student).options(db.joinedload('words')).all()
    print(student_words)
    print(student_object)

    student_object = {
        'student_id': student_object.student_id,
        'fname': student_object.fname,
        'lname': student_object.lname
    }
    print(student_object)
    word_list = []
    for word in student_words:
        word = {
            'word_id': word.words.word_id,
            'word': word.words.word,
        }
        word_list.append(word)

    return jsonify([student_object, word_list])


@app.route("/api/word-detail/<word>")
@cross_origin()
def word_detail(word):
    """Show word detail"""
    word_object = Word.query.filter_by(word_id=word).first()
    student_words = StudentWord.query.filter_by(
        word_id=word).options(db.joinedload('students')).all()

    student_list = []
    for student in student_words:
        student = {
            'student_id': student.students.student_id,
            'fname': student.students.fname,
            'lname': student.students.lname

        }
        student_list.append(student)

    word_object = {
        'word_id': word_object.word_id,
        'word': word_object.word,
        'date': word_object.date_added,
    }

    return jsonify([word_object, student_list])


@cross_origin()
@app.route("/api/delete-student-word", methods=["POST"])
def delete_student_word():
    """Show student detail"""
    data = request.get_json()
    word = data.get('word')
    student = data.get('student')
    student = Student.query.filter_by(student_id=student).first()
    word = Word.query.filter_by(word=word).first()
    studentword = StudentWord.query.filter_by(
        student_id=student.student_id, word_id=word.word_id).first()
    db.session.delete(studentword)
    db.session.commit()

    return "student word deleted!"


def calculate_score(known_words, unknown_words):
    score = len(known_words) / (len(known_words) + len(unknown_words))
    return score * 100


@cross_origin()
@app.route("/api/create-student-test", methods=["POST"])
def create_student_test():
    data = request.get_json()
    student_id = data.get('student_id')
    correct_words = data.get('correct_words')
    incorrect_words = data.get('incorrect_words')
    correct_words = Word.query.filter(
        Word.word.in_(correct_words)).all()
    correct_word_ids = []
    for word in correct_words:
        correct_word_ids.append(word.word_id)
    incorrect_words = Word.query.filter(
        Word.word.in_(incorrect_words)).all()
    incorrect_word_ids = []
    for word in incorrect_words:
        incorrect_word_ids.append(word.word_id)
    score = calculate_score(correct_words, incorrect_words)
    db.session.add(
        StudentTestResult(student_id=student_id, score=score,
                          correct_words=correct_word_ids, incorrect_words=incorrect_word_ids))
    db.session.commit()
    return 'wooo'


@cross_origin()
@app.route("/api/get-student-test/<student>")
def get_student_test(student):
    student_test = StudentTestResult.query.filter_by(
        student_id=student).all()
    print("hello", student_test)
    student_test_list = []
    for student in student_test:
        print("yay", student.student_test_id)
        student_test_object = {
            'student_id': student.student_id,
            'score': student.score,
            'test_date': student.test_date,
            'correct_words': student.correct_words,
            'incorrect_words': student.incorrect_words
        }
        student_test_list.append(student_test_object)
    return jsonify(student_test_list)


if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
