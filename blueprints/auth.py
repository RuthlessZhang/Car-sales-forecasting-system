from flask import Blueprint, render_template, redirect, jsonify, url_for, session
from exts import mail, db
from flask_mail import Message
from flask import request
import string
import random
from models import EmailCaptchaModel, UserModel
from .forms import RegisterForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from decorators import login_required
bp = Blueprint("auth", __name__, url_prefix="/")


@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        return render_template("index.html")
    else:
        return render_template("index.html")


@bp.route("/login", methods=['GET', 'POST'])
def login_page():
    if request.method == 'GET':
        return render_template("login.html")
    else:
        form = LoginForm(request.form)
        if form.validate():
            email = form.email.data
            password = form.password.data
            user = UserModel.query.filter_by(email=email).first()
            if user and check_password_hash(user.password, password):
                session['user_id'] = user.id
                return redirect(url_for('auth.index'))

            else:
                print("密码或者邮箱错误!")
                return redirect(url_for('auth.login_page'))
        else:
            print(form.errors)
            return redirect(url_for('auth.login_page'))


@bp.route("/register", methods=["GET", "POST"])
def register_page():
    if request.method == "GET":
        return render_template("register.html")
    else:
        form = RegisterForm(request.form)
        if form.validate():
            print("success")
            email = form.email.data
            password = form.password.data
            username = form.username.data
            user = UserModel(email=email, password=generate_password_hash(password), username=username)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for("auth.login_page"))
        else:
            print("fail")
            print(form.errors)
            return redirect(url_for("auth.register_page"))


@bp.route("/captcha/mail")
def captcha_mail():
    email = request.args.get("email")
    source = string.digits * 4
    captcha = random.sample(source, 4)
    captcha = ''.join(captcha)
    message = Message(subject="车市脉搏注册验证码", recipients=[email], body=captcha)
    mail.send(message)
    email_captcha = EmailCaptchaModel(email=email, captcha=captcha)
    db.session.add(email_captcha)
    db.session.commit()
    return jsonify({"code": 200, "msg": "", "data": None})


@bp.route("/user")
@login_required
def user_page():
    return render_template("user.html")


@bp.route("/logout")
def logout_page():
    session.clear()
    return redirect(url_for("auth.index"))
