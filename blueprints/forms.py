import wtforms
from flask_wtf import FlaskForm

from wtforms.validators import Email, Length, EqualTo

from models import UserModel, EmailCaptchaModel

from exts import db


class RegisterForm(wtforms.Form):
    email = wtforms.StringField(validators=[Email(message="邮箱格式错误！")])
    captcha = wtforms.StringField(validators=[Length(min=4, max=4, message="验证码格式错误！")])
    username = wtforms.StringField(validators=[Length(min=3, max=20, message="用户名格式错误！")])
    password = wtforms.StringField(validators=[Length(min=6, max=20, message="密码格式错误！")])
    confirm_password = wtforms.StringField(validators=[EqualTo('password')])

    def validate_email(self, field):
        email = field.data
        user = UserModel.query.filter_by(email=email).first()
        if user:
            raise wtforms.ValidationError(message="该邮箱已经被注册！")

    def validate_captcha(self, field):
        captcha = field.data
        email = self.email.data
        captcha_model = EmailCaptchaModel.query.filter_by(email=email, captcha=captcha).first()
        if not captcha_model:
            raise wtforms.ValidationError(message="邮箱或者验证码错误！")


class LoginForm(wtforms.Form):
    email = wtforms.StringField(validators=[Email(message="邮箱格式错误！")])
    password = wtforms.StringField(validators=[Length(min=6, max=20, message="密码格式错误！")])


class AmendForm(wtforms.Form):
    currentPassword = wtforms.StringField(validators=[Length(min=6, max=20, message="密码格式错误！")])
    newPassword = wtforms.StringField(validators=[Length(min=6, max=20, message="密码格式错误！")])
    confirmPassword = wtforms.StringField(validators=[EqualTo('newPassword')])
