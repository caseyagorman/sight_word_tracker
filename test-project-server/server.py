import datetime
from operator import itemgetter
import os
import uuid
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, make_response,
                   redirect, request, flash, abort, session)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, Api, reqparse
from model import Student, Word, Sound, StudentWord, StudentWordTestResult, StudentLetterTestResult, StudentSoundTestResult, Letter, StudentLetter, StudentSound, connect_to_db, db, User
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


# User functions

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
@cross_origin()
def add_user():
    data = request.get_json()
    print(data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password)
    existing_user = User.query.filter_by(username=username).first()
    # Check later for or condition statement on email. Email or user exists, return error
    if existing_user:
        print("already exists")
        return jsonify({'error': 'user already exists'})

    new_user = User(public_id=str(uuid.uuid4()), username=username, email=email,
                    password=hashed_password)
    print(new_user)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'newUser': 'user added'})


"""Student functions"""

# All students

@app.route("/api/students")
@token_required
def get_students(current_user):
    public_id = current_user.public_id
    students = Student.query.filter_by(user_id=public_id).options(
        db.joinedload('studentwords')).all()
    student_list = []
    for student in students:
        print("student", student)

        word_list = sorted(get_student_word_list(student)[0])
        unlearned_word_list = sorted(get_student_word_list(student)[1])
        letter_list = sorted(get_student_letter_list(student)[0])

        unlearned_letter_list = sorted(get_student_letter_list(student)[1])

        sound_list = sorted(get_student_sound_list(student)[0])
        unlearned_sound_list = sorted(get_student_sound_list(student)[1])
        word_count = len(word_list)
        letter_count = len(letter_list)
        sound_count = len(sound_list)
        unlearned_word_count = len(unlearned_word_list)
        unlearned_letter_count = len(unlearned_letter_list)
        unlearned_sound_count = len(unlearned_sound_list)
        student = {
            'student_id': student.student_id,
            'fname': student.fname,
            'lname': student.lname,
            'grade': student.grade,
            'word_count': word_count,
            'letter_count': letter_count,
            'sound_count': sound_count,
            'word_list': word_list,
            'letter_list': letter_list,
            'sound_list': sound_list,
            'unlearned_word_count': unlearned_word_count,
            'unlearned_letter_count': unlearned_letter_count,
            'unlearned_sound_count': unlearned_sound_count,
            'unlearned_word_list': unlearned_word_list,
            'unlearned_letter_list': unlearned_letter_list,
            'unlearned_sound_list': unlearned_sound_list
            

        }
        student_list.append(student)

    student_list = sorted(student_list, key=itemgetter('fname', 'lname'),  reverse=False) 
    return jsonify(student_list)


def get_student_word_list(student):
    student_id = student.student_id
    words = StudentWord.query.filter(StudentWord.student_id == student_id).options(db.joinedload('words')).all()
    word_list = []
    unlearned_word_list =[]
    for word in words:
        if word.Learned == True:
            word_list.append(word.words.word)
        else:
            unlearned_word_list.append(word.words.word)

    return [word_list, unlearned_word_list]


def get_student_letter_list(student):
    student_id = student.student_id
    letters = StudentLetter.query.filter(StudentLetter.student_id == student_id).options(db.joinedload('letters')).all()
    letter_list = []
    unlearned_letter_list = []
    for letter in letters:
        if letter.Learned == True:
            letter_list.append(letter.letters.letter)
        else:
            unlearned_letter_list.append(letter.letters.letter)
    print("letter list", unlearned_letter_list)
    return [letter_list, unlearned_letter_list]


def get_student_sound_list(student):
    student_id = student.student_id
    sounds = StudentSound.query.filter(StudentSound.student_id == student_id).options(db.joinedload('sounds')).all()
    sound_list = []
    unleared_sound_list = []
    for sound in sounds:
        if sound.Learned == True:
            sound_list.append(sound.sounds.sound)
        else: 
            unleared_sound_list.append(sound.sounds.sound)

    return [sound_list, unleared_sound_list]


# Student forms

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

# Student detail

@app.route("/api/details/<student>")
@token_required
def student_detail(current_user, student):
    """Show student detail"""
    user_id = current_user.public_id
    student_object = Student.query.filter_by(
        student_id=student, user_id=user_id).first()
    student_words = StudentWord.query.filter_by(
        student_id=student).options(db.joinedload('words')).all()
    student_letters = StudentLetter.query.filter_by(
        student_id=student).options(db.joinedload('letters')).all()
    student_sounds = StudentSound.query.filter_by(
        student_id=student).options(db.joinedload('sounds')).all()
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

    letter_list = []
    for letter in student_letters:
        if letter.Learned == False:
            letter = {
                'letter_id': letter.letters.letter_id,
                'letter': letter.letters.letter,
            }
            letter_list.append(letter)
        else:
            pass

    sound_list = []
    for sound in student_sounds:
        if sound.Learned == False:
            sound = {
                'sound_id': sound.sounds.sound_id,
                'sound': sound.sounds.sound,
            }
            sound_list.append(sound)
        else:
            pass

    return jsonify([student_object, word_list, letter_list, sound_list])



"""Word functions"""
# All Words
@app.route("/api/words")
@token_required
def get_words(current_user):

    user_id = current_user.public_id
    words = Word.query.filter_by(user_id=user_id).options(
        db.joinedload('studentwords')).all()
    word_list = []

    for word in words:
        student_list = []
        unlearned_student_list =[]
        for item in word.studentwords:
            if item.Learned == True:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                student_list.append(student.fname + " " + student.lname)
            else:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                unlearned_student_list.append(student.fname + " " + student.lname)

        count = get_word_student_counts(word)
        unlearned_count = get_unlearned_word_student_counts(word)
        unlearned_student_list = sorted(unlearned_student_list)
        student_list = sorted(student_list)
        word = {
            'word_id': word.word_id,
            'word': word.word,
            'count': count,
            'unlearned_count': unlearned_count,
            'students': student_list,
            'unlearned_students':unlearned_student_list
        }

        word_list.append(word)
    word_list = sorted(word_list, key=itemgetter('word'))
    return jsonify(word_list)

def get_word_student_counts(word):
    word_id = word.word_id
    words = StudentWord.query.filter(StudentWord.word_id == word_id).filter(
        StudentWord.Learned == True).all()
    return len(words)

def get_unlearned_word_student_counts(word):
    word_id = word.word_id
    words = StudentWord.query.filter(StudentWord.word_id == word_id).filter(
        StudentWord.Learned == False).all()
    return len(words)


@app.route("/api/unknown-words/<student>")
@token_required
def get_unknown_words(current_user, student):
    """gets words that student does not know and are not in current word list, words can then be added to students word list"""
    user_id = current_user.public_id
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

@app.route("/api/word-unknown-students/<word>")
@token_required
def get_unknown_students_word(current_user, word):
    """gets students are not assigned to word"""
    user_id = current_user.public_id
    print(current_user)
    # 566f675f-e940-460a-a06f-c130cb4d9c12
    # edcd9371-1cd7-4f5b-8b4b-0ed85c6f8851
    students = StudentWord.query.filter_by(
        word_id=word, user_id=user_id).options(db.joinedload('students')).all()
    student_ids = []
    for student in students:
        student_ids.append(student.student_id)

    unknown_students = Student.query.filter(Student.student_id.notin_(student_ids)).all()
    student_list = []

    for student in unknown_students:
        student = {
            'student_id': student.student_id,
            'student': student.fname + " " + student.lname
            
        }

        student_list.append(student)
    student_list = sorted(student_list, key=itemgetter('student'))
    return jsonify(student_list)

# Forms

@app.route('/api/add-student-to-word', methods=['POST'])
@token_required
def add_student_to_word(current_user):
    data = request.get_json()
    word_id = data.get("word")
    students = data.get('students')
    user_id = current_user.public_id
    for student_id in students:
        existing_word = StudentWord.query.filter_by(student_id = student_id, word_id = word_id, user_id = user_id).first()
        if not existing_word:
            new_word_student = StudentWord(
                student_id=student_id, word_id=word_id, user_id=user_id)
            db.session.add(new_word_student)
            db.session.commit()
        else:
            continue

    return "student words added!"

@app.route("/api/add-word", methods=['POST'])
@token_required
def add_word(current_user):
    new_words = request.get_json()
    user_id = current_user.public_id
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


# Word detail

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
                'lname': student.students.lname,
                'learned': "no"

            }
            student_list.append(student)

        else:
             student = {
                'student_id': student.students.student_id,
                'fname': student.students.fname,
                'lname': student.students.lname,
                'learned': "yes"
            }

    word_object = {
        'word_id': word_object.word_id,
        'word': word_object.word,
        'date': word_object.date_added,
    }
    student_list = sorted(student_list, key=itemgetter('fname')) 

    return jsonify([word_object, student_list])



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


def get_student_word_chart_data(student_words):
    """is called by get_student_test, returns dictionary of learned and unlearned word counts"""
    learned_count = 0
    learned_words = []
    unlearned_count = 0
    unlearned_words = []
    for word in student_words:
        if word.Learned == True:
            learned_words.append(word.words.word)
            learned_count += 1
        else:
            unlearned_count += 1
            unlearned_words.append(word.words.word)
    chart_data = {"learned": [learned_count, learned_words],
                  "unlearned": [unlearned_count,  unlearned_words]}
    return chart_data

# Tests

def get_student_word_test_list(student_test):
    """is called by get_student_word_test, returns list of student tests"""
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


@app.route("/api/get-student-word-test/<student>")
@token_required
def get_student_word_test(current_user, student):
    """get list of student test results, word_counts and chart_data"""

    user_id = current_user.public_id
    student_id = student
    student_words = StudentWord.query.filter_by(
        user_id=user_id, student_id=student_id).options(db.joinedload('words')).options(db.joinedload('students')).all()
    student_tests = StudentWordTestResult.query.filter_by(
        student_id=student_id, user_id=user_id).all()
    word_counts = get_word_counts(student_words)
    chart_data = get_student_word_chart_data(student_words)
    student_test_list = get_student_word_test_list(student_tests)
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
            if word.correct_count >= 2:
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


@app.route("/api/create-student-word-test", methods=["POST"])
@token_required
def create_student_word_test(current_user):
    """creates new student word test row in db, calls update_correct_words
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
        StudentWordTestResult(student_id=student_id, user_id=user_id, score=score,
                              correct_words=correct_words, incorrect_words=incorrect_words))
    db.session.commit()
    return 'word test added'


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


# Begin letter functions

def get_unlearned_letter_student_counts(letter):
    letter_id = letter.letter_id
    letters = StudentLetter.query.filter(StudentLetter.letter_id == letter_id).filter(
        StudentLetter.Learned == False).all()
    return len(letters)

def get_letter_student_counts(letter):
    letter_id = letter.letter_id
    letters = StudentLetter.query.filter(StudentLetter.letter_id == letter_id).filter(
        StudentLetter.Learned == True).all()
    return len(letters)


@app.route("/api/letters")
@token_required
def get_letters(current_user):

    user_id = current_user.public_id
    letters = Letter.query.filter_by(user_id=user_id).options(
        db.joinedload('studentletters')).all()
    capital_letter_list = []
    lowercase_letter_list = []

    for letter in letters:
        student_list = []
        unlearned_student_list =[]
        for item in letter.studentletters:
            if item.Learned == True:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                student_list.append(student.fname + " " + student.lname)
            else:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                unlearned_student_list.append(student.fname + " " + student.lname)

        count = get_letter_student_counts(letter)
        unlearned_count = get_unlearned_letter_student_counts(letter)
        unlearned_student_list = sorted(unlearned_student_list)
        student_list = sorted(student_list)
        letter = {
            'letter_id': letter.letter_id,
            'letter': letter.letter,
            'count': count,
            'unlearned_count': unlearned_count,
            'students': student_list,
            'unlearned_students':unlearned_student_list
        }
        if letter['letter'].isupper():
            capital_letter_list.append(letter)
        elif letter['letter'].islower():
            lowercase_letter_list.append(letter)
    capital_letter_list = sorted(capital_letter_list, key=itemgetter('letter'))
    lowercase_letter_list = sorted(lowercase_letter_list, key=itemgetter('letter'))
    return jsonify([lowercase_letter_list, capital_letter_list])
# Forms

@app.route("/api/add-letter", methods=['POST'])
@token_required
def add_letter(current_user):
    new_letters = request.get_json()
    user_id = current_user.public_id
    new_letters = new_letters.split()
    letter_dict = {}
    user_letters = Letter.query.filter_by(user_id=user_id).all()
    for letter in user_letters:
        if letter.letter not in letter_dict.keys():
            letter_dict[letter.letter] = 1
        else:
            letter_dict[letter.letter] += 1
    for letter in new_letters:
        if letter in letter_dict.keys():
            continue
        if letter not in letter_dict.keys():
            letter = Letter(letter=letter, user_id=user_id)
            db.session.add(letter)
            db.session.commit()

    return 'letters added'


@app.route('/api/add-student-to-letter', methods=['POST'])
@token_required
def add_student_to_letter(current_user):
    data = request.get_json()
    letter_id = data.get("letter")
    students = data.get('students')
    user_id = current_user.public_id
    for student_id in students:
        existing_word = StudentLetter.query.filter_by(student_id = student_id, 
        letter_id = letter_id, user_id = user_id).first()
        if not existing_word:
            new_letter_student = StudentLetter(
                student_id=student_id, letter_id=letter_id, user_id=user_id)
            db.session.add(new_letter_student)
            db.session.commit()
        else:
            continue

    return "student letters added!"

@app.route("/api/letter-unknown-students/<letter>")
@token_required
def get_unknown_students_letter(current_user, letter):
    """gets students are not assigned to letter"""
    user_id = current_user.public_id
    students = StudentLetter.query.filter_by(
        letter_id=letter, user_id=user_id).options(db.joinedload('students')).all()
    student_ids = []
    for student in students:
        student_ids.append(student.student_id)

    unknown_students = Student.query.filter(Student.student_id.notin_(student_ids)).all()
    student_list = []

    for student in unknown_students:
        student = {
            'student_id': student.student_id,
            'student': student.fname + " " + student.lname
            
        }

        student_list.append(student)
    student_list = sorted(student_list, key=itemgetter('student'))
    return jsonify(student_list)

def get_all_student_letter_counts():
    letters = StudentLetter.query.options(db.joinedload('letters')).all()
    letter_counts = {}
    for letter in letters:
        if letter.Learned == True:
            if letter.letters.letter not in letter_counts:
                letter_counts[letter.letters.letter] = 0
            else:
                letter_counts[letter.letters.letter] += 0
        else:
            if letter.letters.letter not in letter_counts:
                letter_counts[letter.letters.letter] = 1
            else:
                letter_counts[letter.letters.letter] += 1
    return letter_counts


@app.route("/api/letter-detail/<letter>")
@token_required
def letter_detail(current_user, letter):
    """Display letter and students who are learning that letter"""
    user_id = current_user.public_id
    letter_object = Letter.query.filter_by(
        letter_id=letter, user_id=user_id).first()
    student_letters = StudentLetter.query.filter_by(
        letter_id=letter).options(db.joinedload('students')).all()

    student_list = []
    for student in student_letters:
        if student.Learned == False:
            student = {
                'student_id': student.students.student_id,
                'fname': student.students.fname,
                'lname': student.students.lname

            }
            student_list.append(student)
        else:
            pass

    letter_object = {
        'letter_id': letter_object.letter_id,
        'letter': letter_object.letter,
        'date': letter_object.date_added,
    }

    return jsonify([letter_object, student_list])


@app.route("/api/delete-letter", methods=['POST'])
@token_required
def delete_letter(current_user):
    letter_id = request.get_json()
    user_id = current_user.public_id
    letter_to_delete = Letter.query.filter_by(
        letter_id=letter_id, user_id=user_id).first()
    db.session.delete(letter_to_delete)
    db.session.commit()
    return 'letter deleted!'


@app.route("/api/unknown-letters/<student>")
@token_required
def get_unknown_letters(current_user, student):
    """gets letters that student does not know and are not in current letter list, letters can then be added to students letter list"""
    user_id = current_user.public_id
    letters = StudentLetter.query.filter_by(
        student_id=student, user_id=user_id).options(db.joinedload('letters')).all()
    letter_ids = []
    for letter in letters:

        letter_ids.append(letter.letter_id)

    unknown_letters = Letter.query.filter(
        Letter.letter_id.notin_(letter_ids)).all()
    letter_list = []

    for letter in unknown_letters:
        letter = {
            'letter_id': letter.letter_id,
            'letter': letter.letter
        }

        letter_list.append(letter)
    return jsonify(letter_list)


@app.route('/api/add-letters-to-student', methods=['POST'])
@token_required
def add_letter_to_student(current_user):
    data = request.get_json()
    student_id = data.get("student")
    letters = data.get('letters')
    user_id = current_user.public_id
    letter_list = Letter.query.filter(
        (Letter.letter.in_(letters))).filter(Letter.user_id == user_id).all()
    letter_ids = []
    for letter in letter_list:
        letter_ids.append(letter.letter_id)
    for letter_id in letter_ids:
        new_student_letter = StudentLetter(
            letter_id=letter_id, student_id=student_id, user_id=user_id)
        db.session.add(new_student_letter)
        db.session.commit()

    return "student letters added!"


@app.route("/api/get-student-letter-test/<student>")
@token_required
def get_student_letter_test(current_user, student):
    """get list of student test results, letter_counts and chart_data"""

    user_id = current_user.public_id
    student_id = student
    student_letters = StudentLetter.query.filter_by(
        user_id=user_id, student_id=student_id).options(db.joinedload('letters')).options(db.joinedload('students')).all()
    student_tests = StudentLetterTestResult.query.filter_by(
        student_id=student_id, user_id=user_id).all()
    letter_counts = get_letter_counts(student_letters)
    chart_data = get_student_letter_chart_data(student_letters, student)
    student_test_list = get_student_letter_test_list(student_tests)
    learned_letters_list = get_learned_letters_list(student_letters)
    return jsonify([student_test_list, letter_counts, chart_data, learned_letters_list])


def get_letter_counts(student_letters):
    """is called by get student test, returns word, times read correctly,times read incorrectly """
    letter_counts = []
    for student_letter in student_letters:
        count = {
            "letter": student_letter.letters.letter,
            "correct_count": student_letter.correct_count,
            "incorrect_count": student_letter.incorrect_count
        }
        letter_counts.append(count)

    return letter_counts


def get_learned_letters_list(student_letters):
    """is called by get student test, returns list of learned words"""
    learned_letters = []
    for student_letter in student_letters:
        if student_letter.Learned == True:
            learned_letters.append(student_letter.letters.letter)
    return learned_letters


def get_student_letter_chart_data(student_letters, student):
    """is called by get_student_test, returns dictionary of learned and unlearned word counts"""
    print("student letters", student_letters)
    print(student)
    learned_count = 0
    learned_letters = []
    unlearned_count = 0
    unlearned_letters = []
    for letter in student_letters:
        if letter.Learned == True:
            learned_letters.append(letter.letters.letter)
            learned_count += 1
        else:
            unlearned_count += 1
            unlearned_letters.append(letter.letters.letter)
    chart_data = {"learned": [learned_count, learned_letters],
                  "unlearned": [unlearned_count,  unlearned_letters]}
    return chart_data


def get_student_letter_test_list(student_test):
    """is called by get_student_letter_test, returns list of student tests"""
    student_test_list = []
    for student in student_test:
        test_date = student.test_date.strftime('%m-%d-%Y')
        student_test_object = {
            'student_id': student.student_id,
            'score': student.score,
            'test_date': test_date,
            'correct_letters': student.correct_letters,
            'incorrect_letters': student.incorrect_letters
        }
        student_test_list.append(student_test_object)
    return student_test_list

def update_correct_letters(student_id, correct_letters):
    """updates correct letters in db, called by create_student_test"""
    student_letter_list = StudentLetter.query.filter_by(student_id=student_id).options(db.joinedload('letters')).filter(
        Letter.letter.in_(correct_letters)).all()
    for letter in student_letter_list:
        if letter.letters.letter in correct_letters:
            if letter.correct_count >= 2:
                letter.Learned = True
            letter.correct_count = StudentLetter.correct_count + 1
            db.session.commit()
        else:
            pass
    return "correct letters"


def update_incorrect_letters(student_id, incorrect_letters):
    """updates incorrect letters in db, called by create_student_test"""

    student_letter_list = StudentLetter.query.filter_by(student_id=student_id).options(db.joinedload('letters')).filter(
        Letter.letter.in_(incorrect_letters)).all()
    for letter in student_letter_list:
        if letter.letters.letter in incorrect_letters:
            letter.incorrect_count = StudentLetter.incorrect_count + 1
            db.session.commit()
        else:
            pass
    return "incorrect letters"


@app.route("/api/create-student-letter-test", methods=["POST"])
@token_required
def create_student_letter_test(current_user):
    """creates new student letter test row in db, calls update_correct_words
    and update_incorrect_letters functions"""

    data = request.get_json()
    print(data)
    student_id = data.get('student')
    user_id = current_user.public_id
    correct_letters = data.get('correct_letters')
    incorrect_letters = data.get('incorrect_letters')
    score = calculate_score(correct_letters, incorrect_letters)
    update_correct_letters(student_id, correct_letters)
    update_incorrect_letters(student_id, incorrect_letters)
    db.session.add(
        StudentLetterTestResult(student_id=student_id, user_id=user_id, score=score,
                              correct_letters=correct_letters, incorrect_letters=incorrect_letters))
    db.session.commit()
    return 'letter test added'


# Begin Sound Components

@app.route("/api/sounds")
@token_required
def get_sounds(current_user):

    user_id = current_user.public_id
    sounds = Sound.query.filter_by(user_id=user_id).options(
        db.joinedload('studentsounds')).all()
    sound_list = []

    for sound in sounds:
        student_list = []
        unlearned_student_list =[]
        for item in sound.studentsounds:
            if item.Learned == True:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                student_list.append(student.fname + " " + student.lname)
            else:
                student = Student.query.filter_by(
                    student_id=item.student_id).first()
                unlearned_student_list.append(student.fname + " " + student.lname)

        count = get_sound_student_counts(sound)
        unlearned_count = get_unlearned_sound_student_counts(sound)
        unlearned_student_list = sorted(unlearned_student_list)
        student_list = sorted(student_list)
        sound = {
            'sound_id': sound.sound_id,
            'sound': sound.sound,
            'count': count,
            'unlearned_count': unlearned_count,
            'students': student_list,
            'unlearned_students':unlearned_student_list
        }

        sound_list.append(sound)
    sound_list = sorted(sound_list, key=itemgetter('sound'))
    return jsonify(sound_list)


def get_sound_student_counts(sound):
    sound_id = sound.sound_id
    sounds = StudentSound.query.filter(StudentSound.sound_id == sound_id).filter(
        StudentSound.Learned == True).all()
    return len(sounds)

def get_unlearned_sound_student_counts(sound):
    sound_id = sound.sound_id
    sounds = StudentSound.query.filter(StudentSound.sound_id == sound_id).filter(
        StudentSound.Learned == False).all()
    return len(sounds)

@app.route("/api/sound-unknown-students/<sound>")
@token_required
def get_unknown_students_sound(current_user, sound):

    """gets students are not assigned to sound"""
    print("getting unknown students")
    user_id = current_user.public_id
    sound_id = sound
    students = StudentSound.query.filter_by(
        sound_id=sound_id, user_id=user_id).options(db.joinedload('students')).all()
    student_ids = []
    for student in students:
        student_ids.append(student.student_id)

    unknown_students = Student.query.filter(Student.student_id.notin_(student_ids)).all()
    student_list = []

    for student in unknown_students:
        student = {
            'student_id': student.student_id,
            'student': student.fname + " " + student.lname
            
        }

        student_list.append(student)
    student_list = sorted(student_list, key=itemgetter('student'))
    print(student_list)
    return jsonify(student_list)

@app.route('/api/add-student-to-sound', methods=['POST'])
@token_required
def add_student_to_sound(current_user):
    data = request.get_json()
    sound_id = data.get("sound")
    students = data.get('students')
    user_id = current_user.public_id
    for student_id in students:
        existing_sound = StudentSound.query.filter_by(student_id = student_id, 
        sound_id = sound_id, user_id = user_id).first()
        if not existing_sound:
            new_sound_student = StudentSound(
                student_id=student_id, sound_id=sound_id, user_id=user_id)
            db.session.add(new_sound_student)
            db.session.commit()
        else:
            continue

    return "student sounds added!"

@app.route("/api/add-sound", methods=['POST'])
@token_required
def add_sound(current_user):
    new_sounds = request.get_json()
    user_id = current_user.public_id
    new_sounds = new_sounds.split()
    sound_dict = {}
    user_sounds = Sound.query.filter_by(user_id=user_id).all()
    for sound in user_sounds:
        if sound.sound not in sound_dict.keys():
            sound_dict[sound.sound] = 1
        else:
            sound_dict[sound.sound] += 1
    for sound in new_sounds:
        if sound in sound_dict.keys():
            continue
        if sound not in sound_dict.keys():
            sound = Sound(sound=sound, user_id=user_id)
            db.session.add(sound)
            db.session.commit()

    return 'sounds added'


@app.route("/api/sound-detail/<sound>")
@token_required
def sound_detail(current_user, sound):
    """Display sound and students who are learning that sound"""
    user_id = current_user.public_id
    sound_object = Sound.query.filter_by(
        sound_id=sound, user_id=user_id).first()
    student_sounds = StudentSound.query.filter_by(
        sound_id=sound).options(db.joinedload('students')).all()

    student_list = []
    for student in student_sounds:
        if student.Learned == False:
            student = {
                'student_id': student.students.student_id,
                'fname': student.students.fname,
                'lname': student.students.lname

            }
            student_list.append(student)
        else:
            pass

    sound_object = {
        'sound_id': sound_object.sound_id,
        'sound': sound_object.sound,
        'date': sound_object.date_added,
    }
    student_list = sorted(student_list, key=itemgetter('fname'))
    return jsonify([sound_object, student_list])


@app.route("/api/delete-sound", methods=['POST'])
@token_required
def delete_sound(current_user):
    sound_id = request.get_json()
    user_id = current_user.public_id
    sound_to_delete = Sound.query.filter_by(
        sound_id=sound_id, user_id=user_id).first()
    db.session.delete(sound_to_delete)
    db.session.commit()
    return 'sound deleted!'


@app.route("/api/unknown-sounds/<student>")
@token_required
def get_unknown_sounds(current_user, student):
    """gets sounds that student does not know and are not in current sound list, sounds can then be added to students sound list"""
    user_id = current_user.public_id
    sounds = StudentSound.query.filter_by(
        student_id=student, user_id=user_id).options(db.joinedload('sounds')).all()
    sound_ids = []
    for sound in sounds:
        sound_ids.append(sound.sound_id)

    unknown_sounds = Sound.query.filter(
        Sound.sound_id.notin_(sound_ids)).all()
    sound_list = []

    for sound in unknown_sounds:
        sound = {
            'sound_id': sound.sound_id,
            'sound': sound.sound
        }

        sound_list.append(sound)
    return jsonify(sound_list)


@app.route("/api/unknown-sounds-chart/<student>")
@token_required
def get_unknown_sounds_chart(current_user, student):
    """gets sounds that student does not know and are not in current sound list, sounds can then be added to students sound list"""
    user_id = current_user.public_id
    sounds = StudentSound.query.filter_by(
        student_id=student, user_id=user_id).options(db.joinedload('sounds')).all()
    sound_ids = []
    for sound in sounds:
        sound_ids.append(sound.sound_id)

    unknown_sounds = Sound.query.filter(
        Sound.sound_id.notin_(sound_ids)).all()
    sound_list = []

    for sound in unknown_sounds:
        sound = {
            'sound_id': sound.sound_id,
            'sound': sound.sound
        }

        sound_list.append(sound)
    return sound_list


@app.route('/api/add-sound-to-student', methods=['POST'])
@token_required
def add_sound_to_student(current_user):
    data = request.get_json()
    student_id = data.get("student")
    sounds = data.get('sounds')
    user_id = current_user.public_id
    sound_list = Sound.query.filter(
        (Sound.sound.in_(sounds))).filter(Sound.user_id == user_id).all()
    sound_ids = []
    for sound in sound_list:
        sound_ids.append(sound.sound_id)
    for sound_id in sound_ids:
        new_student_sound = StudentSound(
            sound_id=sound_id, student_id=student_id, user_id=user_id)
        db.session.add(new_student_sound)
        db.session.commit()

    return "student sounds added!"


@app.route("/api/get-student-sound-test/<student>")
@token_required
def get_student_sound_test(current_user, student):
    """get list of student test results, word_counts and chart_data"""

    user_id = current_user.public_id
    student_id = student
    student_sounds = StudentSound.query.filter_by(
        user_id=user_id, student_id=student_id).options(db.joinedload('sounds')).options(db.joinedload('students')).all()
    student_tests = StudentSoundTestResult.query.filter_by(
        student_id=student_id, user_id=user_id).all()
    sound_counts = get_sound_counts(student_sounds)
    chart_data = get_student_sound_chart_data(student_sounds, student_id)[0]
    student_test_list = get_student_sound_test_list(student_tests)
    learned_sounds_list = get_learned_sounds_list(student_sounds)
    total_chart_data = get_student_sound_chart_data(student_sounds, student_id)[1]
    return jsonify([student_test_list, sound_counts, chart_data, learned_sounds_list, total_chart_data])


def update_correct_sounds(student_id, correct_sounds):
    """updates correct sounds in db, called by create_student_test"""
    student_sounds_list = StudentSound.query.filter_by(student_id=student_id).options(db.joinedload('sounds')).filter(
        Sound.sound.in_(correct_sounds)).all()
    for sound in student_sounds_list:
        if sound.sounds.sound in correct_sounds:
            if sound.correct_count >= 2:
                sound.Learned = True
            sound.correct_count = StudentSound.correct_count + 1
            db.session.commit()
        else:
            pass
    return "correct sounds"


def update_incorrect_sounds(student_id, incorrect_sounds):
    """updates incorrect sounds in db, called by create_student_test"""

    student_sound_list = StudentSound.query.filter_by(student_id=student_id).options(db.joinedload('sounds')).filter(
        Sound.sound.in_(incorrect_sounds)).all()
    for sound in student_sound_list:
        if sound.sounds.sound in incorrect_sounds:
            sound.incorrect_count = StudentSound.incorrect_count + 1
            db.session.commit()
        else:
            pass
    return "incorrect sounds"

@app.route("/api/create-student-sound-test", methods=["POST"])
@token_required
def create_student_sound_test(current_user):
    """creates new student sound test row in db, calls update_correct_sounds
    and update_incorrect_sounds functions"""

    data = request.get_json()
    student_id = data.get('student')
    user_id = current_user.public_id
    correct_sounds = data.get('correct_sounds')
    incorrect_sounds = data.get('incorrect_sounds')
    score = calculate_score(correct_sounds, incorrect_sounds)
    update_correct_sounds(student_id, correct_sounds)
    update_incorrect_sounds(student_id, incorrect_sounds)
    db.session.add(
        StudentSoundTestResult(student_id=student_id, user_id=user_id, score=score,
                              correct_sounds=correct_sounds, incorrect_sounds=incorrect_sounds))
    db.session.commit()
    return 'sound test added'

def get_sound_counts(student_sounds):
    """is called by get student test, returns word, times read correctly,times read incorrectly """
    sound_counts = []
    for student_sound in student_sounds:
        count = {
            "sound": student_sound.sounds.sound,
            "correct_count": student_sound.correct_count,
            "incorrect_count": student_sound.incorrect_count
        }
        sound_counts.append(count)

    return sound_counts


def get_learned_sounds_list(student_sounds):
    """is called by get student test, returns list of learned sounds"""
    learned_sounds = []
    for student_sound in student_sounds:
        if student_sound.Learned == True:
            learned_sounds.append(student_sound.sounds.sound)
    return learned_sounds


def get_student_sound_chart_data(student_sounds, student):
    """is called by get_student_test, returns dictionary of learned and unlearned word counts"""
    learned_count = 0
    learned_sounds = []
    unlearned_count = 0
    unlearned_sounds = []
    for sound in student_sounds:
        if sound.Learned == True:
            learned_sounds.append(sound.sounds.sound)
            learned_count += 1
        else:
            unlearned_count += 1
            unlearned_sounds.append(sound.sounds.sound)
    unassigned_sounds = get_unknown_sounds_chart(student)
    unassigned_count = len(unassigned_sounds)
    total_count = unassigned_count + unlearned_count
    total_chart_data = {"learned":learned_count, "unlearned": total_count}
    chart_data = {"learned": [learned_count, learned_sounds],
                  "unlearned": [unlearned_count,  unlearned_sounds]}
    return [chart_data, total_chart_data]


def get_student_sound_test_list(student_test):
    """is called by get_student_sound_test, returns list of student tests"""
    student_test_list = []
    for student in student_test:
        test_date = student.test_date.strftime('%m-%d-%Y')
        student_test_object = {
            'student_id': student.student_id,
            'score': student.score,
            'test_date': test_date,
            'correct_sounds': student.correct_sounds,
            'incorrect_sounds': student.incorrect_sounds
        }
        student_test_list.append(student_test_object)
    return student_test_list

# End Sound Components

# def load_csv(filepath='sight_word_tracker.csv'):
#     def parse_student_row(row, cols):
#         student_name = row[0]
#         student_words = [word for idx, word in enumerate(cols) if row[idx] == 1]
#         return {
#             'name': student_name,
#             'words': student_words
#         }

#     with open(filepath, 'rb') as csvfile:
#         csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
#         print dir()
#         cols = csvreader[0]
#         students = [ parse_student_row(row, cols) for row in csvreader[1:] ]
#     return students

if __name__ == "__main__":

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')
