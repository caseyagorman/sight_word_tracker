import datetime
import os
import uuid
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, make_response,
                   redirect, request, flash, abort, session)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, Api, reqparse
from model import Student, Word, StudentWord, StudentTestResult, WordTest, connect_to_db, db, User
from flask_cors import CORS, cross_origin
import jwt
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
    if auth_user and check_password_hash(auth_user.password, password.encode('utf-8')):
        token = jwt.encode({'public_id': auth_user.public_id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('utf-8'), 'username': auth_user.username})
    else:
        return make_response('Could not verify'), 401


@app.route('/protected')
@token_required
def protected():
    return "yay!"


@app.route("/")
@cross_origin()
def index():
    return "homepage"


@app.route("/api/register", methods=['POST'])
@cross_origin()
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    hashed_password = generate_password_hash(password)
    if password == confirm_password:

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
    print(current_user)
    public_id = current_user.public_id
    print(public_id)
    students = Student.query.filter_by(user_id=public_id)
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


@app.route("/api/get-student")
@token_required
@cross_origin()
def get_student(current_user):
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
@token_required
# @cross_origin()
def add_student(current_user):
    print("trying to add student")
    data = request.get_json()
    print("add student", data)
    print("current user", current_user)
    fname = data.get('fname')
    lname = data.get('lname')
    user_id = current_user.public_id
    new_student = Student(user_id=user_id, fname=fname, lname=lname, grade="K")
    db.session.add(new_student)
    db.session.commit()
    return 'student added!'


@app.route("/api/delete-student", methods=['POST'])
@token_required
@cross_origin()
def delete_student(current_user):
    data = request.get_json()
    student_id = data.get('studentId')
    user_id = data.get('userId')
    student = Student.query.filter_by(
        student_id=student_id, user_id=user_id).first()
    db.session.delete(student)
    db.session.commit()
    return 'student deleted!'


@app.route("/api/words/", methods=['POST'])
@token_required
@cross_origin()
def get_words():
    user_id = request.get_json()
    print(user_id)
    words = Word.query.filter_by(user_id=user_id).all()
    word_list = []
    for word in words:
        word = {
            'word_id': word.word_id,
            'word': word.word
        }
        word_list.append(word)
    chart_words = get_all_student_word_counts()
    return jsonify([word_list, chart_words])


@app.route("/api/unknown-words/<student>", methods=['POST'])
@token_required
@cross_origin()
def get_unknown_words(student,):
    print("student!", student)
    user = request.get_json()
    print(user)
    words = StudentWord.query.filter_by(
        student_id=student, user_id=user).options(db.joinedload('words')).all()
    print(words)
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
@token_required
@cross_origin()
def add_word():
    data = request.get_json()
    print(data)
    user_id = data.get('user_id')
    print(user_id)
    new_words = data.get('word')
    new_words = new_words.split()
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
            print("cool!")
            user_id = user_id
            print(word, user_id)
            word = Word(word=word, user_id=user_id)
            db.session.add(word)
            db.session.commit()

    return 'words added'


@app.route("/api/delete-word", methods=['POST'])
@token_required
@cross_origin()
def delete_word():
    data = request.get_json()
    word = data.get('word')
    user_id = data.get('userId')
    print(data)
    word_to_delete = Word.query.filter_by(
        word=word, user_id=user_id).first()
    db.session.delete(word_to_delete)
    db.session.commit()
    return 'word deleted!'


@app.route('/api/add-word-to-student', methods=['POST'])
@token_required
@cross_origin()
def add_word_to_student():
    print("adding word to students")
    data = request.get_json()
    print("data", data)
    student_id = data.get("studentId")
    words = data.get('words')
    user_id = data.get('userId')
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


@app.route('/api/add-word-to-all-students', methods=['POST'])
@token_required
@cross_origin()
def add_word_to_all_student():
    data = request.get_json()
    word = data.get('word')
    students = StudentWord.query.all()
    word = Word.query.filter_by(word=word).first()
    for student in students:
        new_student_word = StudentWord(
            word_id=word.word_id, student_id=student.student_id)
        db.session.add(new_student_word)
        db.session.commit()

    return 'student word added!'


@app.route("/api/details/<student>", methods=['POST'])
@token_required
@cross_origin()
def student_detail(student):
    """Show student detail"""
    print("student", student)
    user = request.get_json()
    print("user", user)
    student_object = Student.query.filter_by(
        student_id=student, user_id=user).first()
    print(student_object)
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


@app.route("/api/word-detail/<word>", methods=['POST'])
@token_required
@cross_origin()
def word_detail(word):
    """Show word detail"""
    print("word", word)
    user = request.get_json()
    print("user", user)
    word_object = Word.query.filter_by(word_id=word, user_id=user).first()
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


@cross_origin()
@app.route("/api/delete-student-word", methods=["POST"])
@token_required
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


@cross_origin()
@app.route("/api/get-learned-words", methods={"POST"})
@token_required
def get_all_learned_words():
    user_id = request.get_json()
    print(user_id)
    student_words = StudentWord.query.filter_by(user_id=user_id).all()
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
    print("learned and unlearned", learned_words, unlearned_words)
    result = {"learned": learned_count, "unlearned": unlearned_count}
    return jsonify(result)


def get_word_counts(student_id, user_id):
    word_counts = StudentWord.query.filter_by(
        student_id=student_id, user_id=user_id).options(db.joinedload('words')).all()
    words = []
    for student_word in word_counts:
        print("word", student_word.words.word, "correct_count",
              student_word.correct_count, "incorrect_count", student_word.incorrect_count)
        count = {
            "word": student_word.words.word,
            "correct_count": student_word.correct_count,
            "incorrect_count": student_word.incorrect_count
        }
        words.append(count)

    return words


def get_percentage_of_words_learned(student_id, user_id):

    word_counts = get_word_counts(student_id, user_id)
    print("word counts", word_counts)
    learned_words = []
    unlearned_words = []
    learned_count = 0
    unlearned_count = 0
    total_count = len(word_counts)
    for item in word_counts:
        if item['correct_count'] >= 3:
            learned_words.append(item['word'])
            learned_count += 1
        else:
            unlearned_words.append(item['word'])
            unlearned_count += 1
    count_data = {"learned_words": learned_words, "unlearned_words": unlearned_words,
                  "learned_count": learned_count, "unlearned_count": unlearned_count,
                  "total_count": total_count}
    return count_data


def get_student_chart_data(student_id, user_id):

    word_counts = get_word_counts(student_id, user_id)
    correct_words = []
    incorrect_words = []
    learning_words = []
    correct_count = 0
    learning_count = 0
    incorrect_count = 0
    for item in word_counts:
        if item['correct_count'] > 0 and item['correct_count'] <= 3:
            learning_words.append(item['word'])
            learning_count += 1

        elif item['correct_count'] >= 4:
            correct_words.append(item['word'])
            correct_count += 1

        elif item['correct_count'] == 0:
            incorrect_words.append(item['word'])
            incorrect_count += 1

    count_data = {"correct_words": correct_words, "incorrect_words": incorrect_words,
                  "correct_count": correct_count, "incorrect_count": incorrect_count,
                  "learning_count": learning_count, "learning_count": learning_count}
    return count_data


def update_correct_words(student_id, correct_words):
    print("correct_words", correct_words)
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
    student_word_list = StudentWord.query.filter_by(student_id=student_id).options(db.joinedload('words')).filter(
        Word.word.in_(incorrect_words)).all()
    for word in student_word_list:
        if word.words.word in incorrect_words:
            word.incorrect_count = StudentWord.incorrect_count + 1
            db.session.commit()
        else:
            pass
    return "incorrect words"


@cross_origin()
@app.route("/api/create-student-test", methods=["POST"])
@token_required
def create_student_test():
    data = request.get_json()
    student_id = data.get('student_id')
    user_id = data.get('userId')
    correct_words = data.get('correct_words')
    print("correct words", correct_words)
    incorrect_words = data.get('incorrect_words')
    print("incorrect words", incorrect_words)
    score = calculate_score(correct_words, incorrect_words)
    update_correct_words(student_id, correct_words)
    update_incorrect_words(student_id, incorrect_words)
    db.session.add(
        StudentTestResult(student_id=student_id, user_id=user_id, score=score,
                          correct_words=correct_words, incorrect_words=incorrect_words))
    db.session.commit()
    return 'wooo'


@cross_origin()
@app.route("/api/get-student-test/<student>", methods=["POST"])
@token_required
def get_student_test(student):
    print(student)
    user_id = request.get_json()
    print(user_id)
    word_count_data = get_percentage_of_words_learned(student, user_id)
    word_counts = get_word_counts(student, user_id)
    chart_data = get_student_chart_data(student, user_id)
    student_test = StudentTestResult.query.filter_by(
        student_id=student, user_id=user_id).all()
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
    return jsonify([student_test_list, word_counts, word_count_data, chart_data])


if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
