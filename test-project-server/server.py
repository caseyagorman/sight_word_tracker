import os
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template,
                   redirect, request, flash, abort,)
from flask_restful import Resource, Api, reqparse
from model import Student, Word, StudentWord, StudentTestResult, WordTest, connect_to_db, db, User
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

app.secret_key = "ABC"


@app.route("/")
@cross_origin()
def index():
    return "homepage"


@app.route("/api/register", methods=['POST'])
@cross_origin()
def add_user():
    data = request.get_json()
    print(data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    # duplicate_user = User.query.filter_by(username=username).all()
    # if duplicate_user:
    #     print(duplicate_user)
    #     return abort(401)
    # else:
    if password == confirm_password:

        new_user = User(username=username, email=email,
                        password=password)
        db.session.add(new_user)
        db.session.commit()
        print('user added')
        return 'user added!'
    else:
        return abort(401)


@app.route("/api/students")
@cross_origin()
def get_students():
    print('hello!')
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


@app.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    print("login")
    data = request.get_json()
    print(data)
    username = data.get('username')
    print(username)
    password = data.get('password')
    print(password)
    auth_user = User.query.filter_by(username=username).first()
    if auth_user:
        print(auth_user)
        if User.check_password_hash(password, auth_user.password):
            user = {
                "user_id": auth_user.user_id
            }
            return jsonify(user)
        else:
            return abort(401)
    else:
        print("no user")
        return abort(401)


@app.route("/api/get-student")
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
    print("trying to add student")
    data = request.get_json()
    print(data)
    user_id = data.get('user_id')
    fname = data.get('fname')
    lname = data.get('lname')
    user_id = data.get('user_id')
    new_student = Student(user_id=user_id, fname=fname, lname=lname, grade="K")
    db.session.add(new_student)
    db.session.commit()
    return 'student added!'


@app.route("/api/delete-student", methods=['POST'])
@cross_origin()
def delete_student():
    data = request.get_json()
    print(data)
    fname = data.get('fname')
    lname = data.get('lname')
    student = Student.query.filter_by(fname=fname, lname=lname).first()
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
    chart_words = get_all_student_word_counts()
    return jsonify([word_list, chart_words])


@app.route("/api/unknown-words/<student>")
@cross_origin()
def get_unknown_words(student):
    print("student!", student)
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
    print(data)
    new_words = data.get('word')
    new_words = new_words.split()
    print(new_words)
    for word in new_words:
        print("word", word)
        word = Word(word=word)
        db.session.add(word)
        db.session.commit()

    return 'word added!'


@app.route("/api/delete-word", methods=['POST'])
@cross_origin()
def delete_word():
    data = request.get_json()
    word = data.get('word')
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
    print("student", student)
    student_object = Student.query.filter(
        Student.student_id == student).first()
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
@cross_origin()
def word_detail(word):
    """Show word detail"""
    word_object = Word.query.filter_by(word_id=word).first()
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
@app.route("/api/get-learned-words")
def get_all_learned_words():
    student_words = StudentWord.query.all()
    learned_count = 0
    unlearned_count = 0
    for word in student_words:
        if word.Learned == True:
            learned_count += 1
        else:
            unlearned_count += 1
    result = {"learned": learned_count, "unlearned": unlearned_count}
    return jsonify(result)


def get_word_counts(student_id):
    word_counts = StudentWord.query.filter_by(
        student_id=student_id).options(db.joinedload('words')).all()
    words = []
    for student_word in word_counts:
        count = {
            "word": student_word.words.word,
            "correct_count": student_word.correct_count,
            "incorrect_count": student_word.incorrect_count
        }
        words.append(count)

    return words


def get_percentage_of_words_learned(student_id):

    word_counts = get_word_counts(student_id)
    correct_words = []
    incorrect_words = []
    correct_count = 0
    incorrect_count = 0
    total_count = len(word_counts)
    for item in word_counts:
        if item['correct_count'] >= 3:
            correct_words.append(item['word'])
            correct_count += 1
        else:
            incorrect_words.append(item['word'])
            incorrect_count += 1
    count_data = {"correct_words": correct_words, "incorrect_words": incorrect_words,
                  "correct_count": correct_count, "incorrect_count": incorrect_count,
                  "total_count": total_count}
    return count_data


def get_student_chart_data(student_id):

    word_counts = get_word_counts(student_id)
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
def create_student_test():
    data = request.get_json()
    student_id = data.get('student_id')
    correct_words = data.get('correct_words')
    incorrect_words = data.get('incorrect_words')
    score = calculate_score(correct_words, incorrect_words)
    update_correct_words(student_id, correct_words)
    update_incorrect_words(student_id, incorrect_words)
    db.session.add(
        StudentTestResult(student_id=student_id, score=score,
                          correct_words=correct_words, incorrect_words=incorrect_words))
    db.session.commit()
    return 'wooo'


@cross_origin()
@app.route("/api/get-student-test/<student>")
def get_student_test(student):
    word_count_data = get_percentage_of_words_learned(student)
    word_counts = get_word_counts(student)
    chart_data = get_student_chart_data(student)
    student_test = StudentTestResult.query.filter_by(
        student_id=student).all()
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
