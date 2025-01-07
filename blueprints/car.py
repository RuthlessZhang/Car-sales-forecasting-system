from flask import Blueprint, render_template, request, redirect, url_for,jsonify
from flask import render_template
from decorators import login_required
from models import CarModel

bp = Blueprint('car', __name__, url_prefix='/')


@bp.route('/car')
@login_required
def car_page():
    return render_template('car.html')


@bp.route('/forecast')
@login_required
def forecast_page():
    return render_template('forecast.html')


@bp.route('/search', methods=['GET', 'POST'])
@login_required
def search_page():
    carName = request.args.get('carName')
    carInfo = CarModel.query.filter_by(carName=carName).first()
    if carInfo:
        return jsonify({
            'carName': carInfo.carName,
            'manufacturer': carInfo.manufacturer,
            'image_url': carInfo.image_url,
            'brand': carInfo.brand,
            'origin': carInfo.origin,
            'engine': carInfo.engine,
            'fuel_consumption': carInfo.fuel_consumption
        })
    else:
        return jsonify({"code": 400, "msg": "erro", "data": None})