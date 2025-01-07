from datetime import datetime
from sqlalchemy import Column, Numeric
from exts import db


class UserModel(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    joined_date = db.Column(db.DateTime, default=datetime.now)


class EmailCaptchaModel(db.Model):
    __tablename__ = 'email_captcha'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), nullable=False)
    captcha = db.Column(db.String(100), nullable=False)


class CarModel(db.Model):
    __tablename__ = 'car'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # id
    carName = db.Column(db.String(100), nullable=False)  # 汽车名称
    manufacturer = db.Column(Numeric(10, 2), nullable=False)  # 指导价
    image_url = db.Column(db.String(100), nullable=False)  # 图像url
    brand = db.Column(db.String(100))  # 品牌
    origin = db.Column(db.String(100))  # 产地
    engine = db.Column(db.String(100))  # 发动机
    fuel_consumption = db.Column(Numeric(10, 2), nullable=False)  # 油耗
