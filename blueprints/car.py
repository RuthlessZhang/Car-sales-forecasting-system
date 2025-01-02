from flask import Blueprint
from flask import render_template

bp = Blueprint('car', __name__, url_prefix='/')


@bp.route('/car')
def car_page():
    return render_template('car.html')


@bp.route('/forecast')
def forecast_page():
    return render_template('forecast.html')