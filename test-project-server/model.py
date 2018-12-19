from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    """User of literacy website."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(64), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))

    students = db.relationship(
        'Student', cascade="save-update, merge, delete")
    words = db.relationship('Word', cascade="save-update, merge, delete")

    def __init__(self, name, id, active=True):
        self.name = name
        self.id = id
        self.active = active

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return True

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Student(db.Model):
    """table of students"""

    __tablename__ = "students"

    student_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)
    fname = db.Column(db.String(64), nullable=False)
    lname = db.Column(db.String(64), nullable=False)
    grade = db.Column(db.String(64), nullable=False)

    users = db.relationship(
        'User')
    studentwords = db.relationship(
        'StudentWord', cascade="save-update, merge, delete")
    studenttestresults = db.relationship(
        'StudentTestResult', cascade="save-update, merge, delete")

    def __repr__(self):
        return f"<Student student_id={self.student_id} first_name={self.fname} last_name={self.lname}>"


class Word(db.Model):
    """table of words"""

    __tablename__ = "words"

    word_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    word = db.Column(db.String(25), nullable=False, unique=True)
    date_added = db.Column(db.DateTime, nullable=False,
                           default=datetime.today)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)
    studentwords = db.relationship(
        'StudentWord', cascade="save-update, merge, delete")
    users = db.relationship(
        'User')

    def __repr__(self):
        return f"<Word word_id={self.word_id} word={self.word}>"


class StudentWord(db.Model):
    """table of student words"""

    __tablename__ = "studentwords"

    student_word_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey(
        'words.word_id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students.student_id'), nullable=False)
    added_to_student = db.Column(
        db.DateTime, nullable=False, default=datetime.today)
    correct_count = db.Column(db.Integer, default=0, nullable=True)
    incorrect_count = db.Column(db.Integer, default=0, nullable=True)
    Learned = db.Column(db.Boolean, unique=False, default=False)
    students = db.relationship(
        'Student')
    words = db.relationship(
        'Word')

    def __repr__(self):
        return f"<StudentWord student_word_id={self.student_word_id}>"


class StudentTestResult(db.Model):
    """table of student tests"""

    __tablename__ = "studenttestresults"

    student_test_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students.student_id'), nullable=False)
    score = db.Column(db.Float)
    wordtest_id = db.Column(db.ForeignKey('wordtests.wordtest_id'))
    test_date = db.Column(db.DateTime, nullable=True, default=datetime.today)
    correct_words = db.Column(
        db.ARRAY(db.String(25)))
    incorrect_words = db.Column(
        db.ARRAY(db.String(25)))

    students = db.relationship(
        'Student', cascade="save-update, merge, delete")

    def __repr__(self):
        return f"<StudentTest student_test_id={self.student_test_id}>"


class WordTest(db.Model):
    """table of word tests"""

    __tablename__ = "wordtests"

    wordtest_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey(
        'words.word_id'), nullable=False)
    test_date = db.Column(db.DateTime, nullable=True)
    num_correct = db.Column(db.Integer, nullable=True)


def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///students'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")
