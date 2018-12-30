import datetime
import os
import uuid
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, make_response,
                   redirect, request, flash, abort, session)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, Api, reqparse
from model import Student, Word, StudentWord, StudentTestResult, WordTest, connect_to_db, db, User
import jwt
from flask_cors import CORS, cross_origin
from werkzeug.security import safe_str_cmp
from functools import wraps
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(
                public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'Token is invalid'})
        return f(current_user, *args, **kwargs)
    return decorated


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    auth_user = User.query.filter_by(username=username).first()
    if not auth_user:
        return jsonify({'error': 'user does not exist'})
    if auth_user and check_password_hash(auth_user.password, password.encode('utf-8')):
        token = jwt.encode({'public_id': auth_user.public_id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('utf-8'), 'username': auth_user.username})
    else:
        return jsonify({'error': 'incorrect password'})


@app.route("/")
@token_required
def index(current_user):
    return current_user


@app.route("/api/register", methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    hashed_password = generate_password_hash(password)
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'user already exists'})
    if password != confirm_password:
        return jsonify({"error": "passwords don't match"})
    elif password == confirm_password and not existing_user:
        new_user = User(public_id=str(uuid.uuid4()), username=username, email=email,
                        password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return 'user added!'
    else:
        return abort(401)


@app.route("/api/students")
@token_required
def get_students(current_user):
    public_id = current_user.public_id
    students = Student.query.filter_by(user_id=public_id).options(
        db.joinedload('studentwords')).all()
    student_list = []
    for student in students:
        count = get_student_word_counts(student)
        student = {
            'student_id': student.student_id,
            'fname': student.fname,
            'lname': student.lname,
            'grade': student.grade,
            'count': count
        }
        student_list.append(student)
    print(student_list)
    return jsonify(student_list)


def get_student_word_counts(student):
    student_id = student.student_id
    words = StudentWord.query.filter(StudentWord.student_id == student_id).filter(
        StudentWord.Learned == False).all()
    return len(words)


@app.route("/api/add-student", methods=['POST'])
@token_required
def add_student(current_user):
    data = request.get_json()
    fname = data.get('fname')
    lname = data.get('lname')
    user_id = current_user.public_id
    new_student = Student(user_id=user_id, fname=fname, lname=lname, grade="K")
    db.session.add(new_student)
    db.session.commit()
    return 'student added!'


@app.route("/api/delete-student", methods=['POST'])
@token_required
def delete_student(current_user):
    student_id = request.get_json()
    user_id = current_user.public_id
    student = Student.query.filter_by(
        student_id=student_id, user_id=user_id).first()
    db.session.delete(student)
    db.session.commit()
    return 'student deleted!'


def get_all_student_word_counts():
    words = StudentWord.query.options(db.joinedload('words')).all()
    word_counts = {}
    for word in words:
        if word.Learned == True:
            if word.words.word not in word_counts:
                word_counts[word.words.word] = 0
            else:
                word_counts[word.words.word] += 0
        else:
            if word.words.word not in word_counts:
                word_counts[word.words.word] = 1
            else:
                word_counts[word.words.word] += 1
    return word_counts


@app.route("/api/words")
@token_required
def get_words(current_user):

    user_id = current_user.public_id
    words = Word.query.filter_by(user_id=user_id).all()
    word_list = []
    for word in words:
        count = get_word_student_counts(word)
        word = {
            'word_id': word.word_id,
            'word': word.word,
            'count': count
        }
        word_list.append(word)
    chart_words = get_all_student_word_counts()
    return jsonify([word_list, chart_words])


def get_word_student_counts(word):
    word_id = word.word_id
    words = StudentWord.query.filter(StudentWord.word_id == word_id).filter(
        StudentWord.Learned == False).all()
    return len(words)


@app.route("/api/unknown-words/<student>")
@token_required
def get_unknown_words(current_student, student):
    """gets words that student does not know and are not in current word list, words can then be added to students word list"""
    user_id = current_student.public_id
    words = StudentWord.query.filter_by(
        student_id=student, user_id=user_id).options(db.joinedload('words')).all()
    word_ids = []
    for word in words:

        word_ids.append(word.word_id)

    unknown_words = Word.query.filter(Word.word_id.notin_(word_ids)).all()
    word_list = []

    for word in unknown_words:
        word = {
            'word_id': word.word_id,
            'word': word.word
        }

        word_list.append(word)

    return jsonify(word_list)


@app.route("/api/add-word", methods=['POST'])
@token_required
def add_word(current_user):
    new_words = request.get_json()
    user_id = current_user.public_id
    new_words = new_words.split()
    print("add words", user_id, new_words)
    word_dict = {}
    user_words = Word.query.filter_by(user_id=user_id).all()
    for word in user_words:
        if word.word not in word_dict.keys():
            word_dict[word.word] = 1
        else:
            word_dict[word.word] += 1
    for word in new_words:
        user_id = user_id

        if word in word_dict.keys():
            user_id = user_id
            continue
        user_id = user_id
        if word not in word_dict.keys():
            user_id = user_id
            word = Word(word=word, user_id=user_id)
            db.session.add(word)
            db.session.commit()

    return 'words added'


@app.route("/api/delete-word", methods=['POST'])
@token_required
def delete_word(current_user):
    word_id = request.get_json()
    user_id = current_user.public_id
    word_to_delete = Word.query.filter_by(
        word_id=word_id, user_id=user_id).first()
    db.session.delete(word_to_delete)
    db.session.commit()
    return 'word deleted!'


@app.route('/api/add-word-to-student', methods=['POST'])
@token_required
def add_word_to_student(current_user):
    data = request.get_json()
    student_id = data.get("student")
    words = data.get('words')
    user_id = current_user.public_id
    word_list = Word.query.filter(
        (Word.word.in_(words))).filter(Word.user_id == user_id).all()
    word_ids = []
    for word in word_list:
        word_ids.append(word.word_id)
    for word_id in word_ids:
        new_student_word = StudentWord(
            word_id=word_id, student_id=student_id, user_id=user_id)
        db.session.add(new_student_word)
        db.session.commit()

    return "student words added!"


# @app.route('/api/add-word-to-all-students', methods=['POST'])
# @token_required
# def add_word_to_all_student():
#     data = request.get_json()
#     word = data.get('word')
#     students = StudentWord.query.all()
#     word = Word.query.filter_by(word=word).first()
#     for student in students:
#         new_student_word = StudentWord(
#             word_id=word.word_id, student_id=student.student_id)
#         db.session.add(new_student_word)
#         db.session.commit()

#     return 'student word added!'


@app.route("/api/details/<student>")
@token_required
def student_detail(current_user, student):
    """Show student detail"""
    user_id = current_user.public_id
    student_object = Student.query.filter_by(
        student_id=student, user_id=user_id).first()
    student_words = StudentWord.query.filter_by(
        student_id=student).options(db.joinedload('words')).all()
    student_object = {
        'student_id': student_object.student_id,
        'fname': student_object.fname,
        'lname': student_object.lname
    }
    word_list = []
    for word in student_words:
        if word.Learned == False:
            word = {
                'word_id': word.words.word_id,
                'word': word.words.word,
            }
            word_list.append(word)
        else:
            pass
    return jsonify([student_object, word_list])


@app.route("/api/word-detail/<word>")
@token_required
def word_detail(current_user, word):
    """Display word and students who are learning that word"""
    user_id = current_user.public_id
    word_object = Word.query.filter_by(word_id=word, user_id=user_id).first()
    student_words = StudentWord.query.filter_by(
        word_id=word).options(db.joinedload('students')).all()

    student_list = []
    for student in student_words:
        if student.Learned == False:
            student = {
                'student_id': student.students.student_id,
                'fname': student.students.fname,
                'lname': student.students.lname

            }
            student_list.append(student)
        else:
            pass

    word_object = {
        'word_id': word_object.word_id,
        'word': word_object.word,
        'date': word_object.date_added,
    }

    return jsonify([word_object, student_list])


@app.route("/api/delete-student-word", methods=["POST"])
@token_required
def delete_student_word(current_user):
    """Show student detail"""
    data = request.get_json()
    user_id = current_user.public_id
    word = data.get('word')
    student = data.get('student')
    word = Word.query.filter_by(word=word, user_id=user_id).first()
    studentword = StudentWord.query.filter_by(
        student_id=student.student_id, word_id=word.word_id).first()
    db.session.delete(studentword)
    db.session.commit()

    return "student word deleted!"


def get_word_counts(student_words):
    """is called by get student test, returns word, times read correctly,times read incorrectly """
    word_counts = []
    for student_word in student_words:
        count = {
            "word": student_word.words.word,
            "correct_count": student_word.correct_count,
            "incorrect_count": student_word.incorrect_count
        }
        word_counts.append(count)

    return word_counts


def get_learned_words_list(student_words):
    """is called by get student test, returns list of learned words"""
    learned_words = []
    for student_word in student_words:
        if student_word.Learned == True:
            learned_words.append(student_word.words.word)
    return learned_words


def get_student_chart_data(student_words):
    """is called by get_student_test, returns dictionary of learned and unlearned word counts"""
    learned_count = 0
    learned_words = []
    unlearned_count = 0
    unlearned_words = []
    for word in student_words:
        if word.Learned == True:
            learned_words.append(word)
            learned_count += 1
        else:
            unlearned_count += 1
            unlearned_words.append(word)
    chart_data = {"learned": learned_count, "unlearned": unlearned_count}
    return chart_data


def get_student_test_list(student_test):
    """is called by get_student_test, returns list of student tests"""
    student_test_list = []
    for student in student_test:
        test_date = student.test_date.strftime('%m-%d-%Y')
        student_test_object = {
            'student_id': student.student_id,
            'score': student.score,
            'test_date': test_date,
            'correct_words': student.correct_words,
            'incorrect_words': student.incorrect_words
        }
        student_test_list.append(student_test_object)
    return student_test_list


@app.route("/api/get-student-test/<student>")
@token_required
def get_student_test(current_user, student):
    """get list of student test results, word_counts and chart_data"""

    user_id = current_user.public_id
    student_id = student
    student_words = StudentWord.query.filter_by(
        user_id=user_id, student_id=student_id).options(db.joinedload('words')).options(db.joinedload('students')).all()
    student_tests = StudentTestResult.query.filter_by(
        student_id=student_id, user_id=user_id).all()
    word_counts = get_word_counts(student_words)
    chart_data = get_student_chart_data(student_words)
    student_test_list = get_student_test_list(student_tests)
    learned_words_list = get_learned_words_list(student_words)
    return jsonify([student_test_list, word_counts, chart_data, learned_words_list])


def calculate_score(known_words, unknown_words):
    """calculates student test score, called by create_student_test"""
    score = len(known_words) / (len(known_words) + len(unknown_words))
    score = score * 100
    score = int(round(score))
    return score


def update_correct_words(student_id, correct_words):
    """updates correct words in db, called by create_student_test"""
    student_word_list = StudentWord.query.filter_by(student_id=student_id).options(db.joinedload('words')).filter(
        Word.word.in_(correct_words)).all()
    for word in student_word_list:
        if word.words.word in correct_words:
            if word.correct_count >= 3:
                word.Learned = True
            word.correct_count = StudentWord.correct_count + 1
            db.session.commit()
        else:
            pass
    return "correct words"


def update_incorrect_words(student_id, incorrect_words):
    """updates incorrect words in db, called by create_student_test"""

    student_word_list = StudentWord.query.filter_by(student_id=student_id).options(db.joinedload('words')).filter(
        Word.word.in_(incorrect_words)).all()
    for word in student_word_list:
        if word.words.word in incorrect_words:
            word.incorrect_count = StudentWord.incorrect_count + 1
            db.session.commit()
        else:
            pass
    return "incorrect words"


@app.route("/api/create-student-test", methods=["POST"])
@token_required
def create_student_test(current_user):
    """creates new student test row in db, calls update_correct_words
    and update_incorrect_words functions"""

    data = request.get_json()
    student_id = data.get('student')
    user_id = current_user.public_id
    correct_words = data.get('correct_words')
    incorrect_words = data.get('incorrect_words')
    score = calculate_score(correct_words, incorrect_words)
    update_correct_words(student_id, correct_words)
    update_incorrect_words(student_id, incorrect_words)
    db.session.add(
        StudentTestResult(student_id=student_id, user_id=user_id, score=score,
                          correct_words=correct_words, incorrect_words=incorrect_words))
    db.session.commit()
    return 'test added'


if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
