from flask import Flask, session, g
from flask import render_template
from flask_mail import Mail

import config
from exts import db, mail
from models import UserModel
from blueprints.auth import bp as auth_bp
from blueprints.car import bp as car_bp
from flask_migrate import Migrate

app = Flask(__name__)

app.config.from_object(config)

db.init_app(app)
mail.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(auth_bp)
app.register_blueprint(car_bp)


@app.before_request
def my_before_request():
    user_id = session.get('user_id')
    if user_id is None:
        user = UserModel.query.get(user_id)
        setattr(g, 'user', user)
    else:
        setattr(g, 'user', None)


if __name__ == '__main__':
    app.run()
