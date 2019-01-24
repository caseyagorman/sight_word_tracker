from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from secrets import token_hex
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

db = SQLAlchemy()


class User1(db.Model):
    """User of literacy website."""

    __tablename__ = "users1"

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String(128))

    students1 = db.relationship(
        'Student1', cascade="save-update, merge, delete")
    words = db.relationship('Word', cascade="save-update, merge, delete")
    letters = db.relationship('Letter', cascade="save-update, merge, delete")
    sounds = db.relationship('Letter', cascade="save-update, merge, delete")
    studentwords = db.relationship(
        'StudentWord', cascade="save-update, merge, delete")
    studentletters = db.relationship(
        'StudentLetter', cascade="save-update, merge, delete")
    studentsounds = db.relationship(
        'StudentSound', cascade="save-update, merge, delete")
    studentwordtestresults = db.relationship(
        'StudentWordTestResult', cascade="save-update, merge, delete")
    studentlettertestresults = db.relationship(
        'StudentLetterTestResult', cascade="save-update, merge, delete")
    studentsoundtestresults = db.relationship(
        'StudentSoundTestResult', cascade="save-update, merge, delete")

    def __repr__(self):
        return f"<User id={self.public_id} email={self.email}>"


class Student1(db.Model):
    """table of students"""

    __tablename__ = "students1"

    student_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    fname = db.Column(db.String(64), nullable=False)
    lname = db.Column(db.String(64), nullable=False)
    grade = db.Column(db.String(64), nullable=False)

    users1 = db.relationship(
        'User1')
    studentwords = db.relationship(
        'StudentWord', cascade="save-update, merge, delete")
    studentletters = db.relationship(
        'StudentLetter', cascade="save-update, merge, delete")
    studentsounds = db.relationship(
        'StudentSound', cascade="save-update, merge, delete")
    studentwordtestresults = db.relationship(
        'StudentWordTestResult', cascade="save-update, merge, delete")
    studentlettertestresults = db.relationship(
        'StudentLetterTestResult', cascade="save-update, merge, delete")
    studentsoundtestresults = db.relationship(
        'StudentLetterTestResult', cascade="save-update, merge, delete")

    def __repr__(self):
        return f"<Student student_id={self.student_id} first_name={self.fname} last_name={self.lname}>"


class Word(db.Model):
    """table of words"""

    __tablename__ = "words"

    word_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    word = db.Column(db.String(25), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False,
                           default=datetime.today)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)

    studentwords = db.relationship(
        'StudentWord', cascade="save-update, merge, delete")
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<Word word_id={self.word_id} word={self.word}>"


class Letter(db.Model):
    """table of letters"""

    __tablename__ = "letters"

    letter_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    letter = db.Column(db.String(25), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False,
                           default=datetime.today)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)

    studentletters = db.relationship(
        'StudentLetter', cascade="save-update, merge, delete")
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<letter letter_id={self.letter_id} letter={self.letter}>"


class Sound(db.Model):
    """table of sounds"""

    __tablename__ = "sounds"

    sound_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    sound = db.Column(db.String(25), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False,
                           default=datetime.today)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)

    studentsounds = db.relationship(
        'StudentSound', cascade="save-update, merge, delete")
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<sound sound_id={self.sound_id} letter={self.sound}>"


class StudentWord(db.Model):
    """table of student words"""

    __tablename__ = "studentwords"

    student_word_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey(
        'words.word_id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    added_to_student = db.Column(
        db.DateTime, nullable=False, default=datetime.today)
    correct_count = db.Column(db.Integer, default=0, nullable=True)
    incorrect_count = db.Column(db.Integer, default=0, nullable=True)
    Learned = db.Column(db.Boolean, unique=False, default=False)

    students1 = db.relationship(
        'Student1')
    words = db.relationship(
        'Word')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentWord student_word_id={self.student_word_id}>"


class StudentLetter(db.Model):
    """table of student letters"""

    __tablename__ = "studentletters"

    student_letter_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    letter_id = db.Column(db.Integer, db.ForeignKey(
        'letters.letter_id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    added_to_student = db.Column(
        db.DateTime, nullable=False, default=datetime.today)
    correct_count = db.Column(db.Integer, default=0, nullable=True)
    incorrect_count = db.Column(db.Integer, default=0, nullable=True)
    Learned = db.Column(db.Boolean, unique=False, default=False)

    students1 = db.relationship(
        'Student1')
    letters = db.relationship(
        'Letter')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentLetter student_letter_id={self.student_letter_id}>"


class StudentSound(db.Model):
    """table of student letters"""

    __tablename__ = "studentsounds"

    student_sound_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    sound_id = db.Column(db.Integer, db.ForeignKey(
        'sounds.sound_id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    added_to_student = db.Column(
        db.DateTime, nullable=False, default=datetime.today)
    correct_count = db.Column(db.Integer, default=0, nullable=True)
    incorrect_count = db.Column(db.Integer, default=0, nullable=True)
    Learned = db.Column(db.Boolean, unique=False, default=False)

    students1 = db.relationship(
        'Student1')
    sounds = db.relationship(
        'Sound')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentSound student_sound_id={self.student_sound_id}>"


class StudentWordTestResult(db.Model):
    """table of student tests"""

    __tablename__ = "studentwordtestresults"

    student_word_test_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    score = db.Column(db.Float)
    test_date = db.Column(db.DateTime, nullable=True,
                          default=datetime.today)
    correct_words = db.Column(
        db.ARRAY(db.String(25)))
    incorrect_words = db.Column(
        db.ARRAY(db.String(25)))

    students1 = db.relationship(
        'Student1')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentWordTestResults student_word_test_id={self.student_word_test_id}>"


class StudentLetterTestResult(db.Model):
    """table of student tests"""

    __tablename__ = "studentlettertestresults"

    student_letter_test_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    score = db.Column(db.Float)
    test_date = db.Column(db.DateTime, nullable=True,
                          default=datetime.today)
    correct_letters = db.Column(
        db.ARRAY(db.String(25)))
    incorrect_letters = db.Column(
        db.ARRAY(db.String(25)))

    students1 = db.relationship(
        'Student1')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentLetterTest student_letter_test_id={self.student_letter_test_id}>"


class StudentSoundTestResult(db.Model):
    """table of student tests"""

    __tablename__ = "studentsoundtestresults"

    student_sound_test_id = db.Column(
        db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students1.student_id'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey(
        'users1.public_id'), nullable=False)
    score = db.Column(db.Float)
    test_date = db.Column(db.DateTime, nullable=True,
                          default=datetime.today)
    correct_sounds = db.Column(
        db.ARRAY(db.String(25)))
    incorrect_sounds = db.Column(
        db.ARRAY(db.String(25)))

    students1 = db.relationship(
        'Student1')
    users1 = db.relationship(
        'User1')

    def __repr__(self):
        return f"<StudentSoundTest student_sound_test_id={self.student_sound_test_id}>"

# class WordTest(db.Model):
#     """table of word tests"""

#     __tablename__ = "wordtests"

#     wordtest_id = db.Column(
#         db.Integer, autoincrement=True, primary_key=True)
#     word_id = db.Column(db.Integer, db.ForeignKey(
#         'words.word_id'), nullable=False)
#     test_date = db.Column(db.DateTime, nullable=True)
#     num_correct = db.Column(db.Integer, nullable=True)


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
