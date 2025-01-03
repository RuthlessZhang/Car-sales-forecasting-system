from flask import Blueprint
from flask import render_template
from decorators import login_required
bp = Blueprint('car', __name__, url_prefix='/')


@bp.route('/car')
@login_required
def car_page():
    return render_template('car.html')


@bp.route('/forecast')
@login_required
def forecast_page():
    return render_template('forecast.html')