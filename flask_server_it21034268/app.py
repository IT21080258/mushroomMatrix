import tensorflow as tf

from flask import Flask, request, jsonify
import os
import pickle
import numpy as np
from pymongo import MongoClient
from bson import ObjectId

import logging

app = Flask(__name__)

# Define the relative path to the model directory
model_dir = os.path.join(app.root_path, 'it21034268')

# Load models using relative paths
with open(os.path.join(model_dir, 'c_aom_model.pkl'), 'rb') as file:
    aom_model = pickle.load(file)
with open(os.path.join(model_dir, 'c_bm_model.pkl'), 'rb') as file:
    bm_model = pickle.load(file)
with open(os.path.join(model_dir, 'c_bom_model.pkl'), 'rb') as file:
    bom_model = pickle.load(file)
with open(os.path.join(model_dir, 'c_pom_model.pkl'), 'rb') as file:
    pom_model = pickle.load(file)

with open(os.path.join(model_dir, 'aom_cy_yearly.pkl'), 'rb') as file:
    aom_cy_yearly_model = pickle.load(file)
with open(os.path.join(model_dir, 'aom_cy_monthly.pkl'), 'rb') as file:
    aom_cy_monthly_model = pickle.load(file)
with open(os.path.join(model_dir, 'aom_fy_yearly.pkl'), 'rb') as file:
    aom_fy_yearly_model = pickle.load(file)
with open(os.path.join(model_dir, 'aom_fy_monthly.pkl'), 'rb') as file:
    aom_fy_monthly_model = pickle.load(file)


with open(os.path.join(model_dir, 'am_cy_yearly.pkl'), 'rb') as file:
    am_cy_yearly_model = pickle.load(file)
with open(os.path.join(model_dir, 'am_cy_monthly.pkl'), 'rb') as file:
    am_cy_monthly_model = pickle.load(file)
with open(os.path.join(model_dir, 'am_fy_yearly.pkl'), 'rb') as file:
    am_fy_yearly_model = pickle.load(file)
with open(os.path.join(model_dir, 'am_fy_monthly.pkl'), 'rb') as file:
    am_fy_monthly_model = pickle.load(file)


# Connect to MongoDB
client = None
db = None
collection = None

# Configure logging to display messages in the console
logging.basicConfig(level=logging.DEBUG,  # Set log level to DEBUG to capture all messages
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')  # Define the format

########################################################################################
# /add_predict_customer_demand

@app.route('/add_predict_customer_demand', methods=['POST'])
def predict():

    app.logger.info('Hey')
    param_dc = None
    param_tm = None
    data = request.get_json()
    param_dc = data.get('param_dc')
    param_tm = data.get('param_tm')

    # Log the received data
    app.logger.info("hey")
    
    if param_dc is None or param_tm is None:
        return jsonify({'error': 'Please provide both param_dc and param_tm'}), 400

    # Data preparation logic
    param_1 = None
    param_2 = None

    if param_dc > 25:
        param_1 = 1
        param_dc = 25
    elif param_dc < 1:
        param_1 = 0
        param_dc = 1
    else:
        param_1 = (param_dc - 1) / 24
    if param_tm > 7:
        param_2 = 1
        param_tm = 7
    elif param_tm < 2:
        param_2 = 0
        param_tm = 2
    else:
        param_2 = (param_tm - 2) / 5

    param = np.array([[param_1, param_2]])

    # Prediction logic
    aom_y_pred = aom_model.predict(param)
    aom_prediction = int(np.ceil(aom_y_pred[0][0]))
    
    bm_y_pred = bm_model.predict(param)
    bm_prediction = int(np.ceil(bm_y_pred[0][0]))
    
    bom_y_pred = bom_model.predict(param)
    bom_prediction = int(np.ceil(bom_y_pred[0][0]))
    
    pom_y_pred = pom_model.predict(param)
    pom_prediction = int(np.ceil(pom_y_pred[0][0]))

    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predictCustomerDemand']
    
    # Save predictions to MongoDB
    prediction_data = {
        'district_code': param_dc,
        'number_of_members': param_tm,
        'aom_prediction': aom_prediction,
        'bm_prediction': bm_prediction,
        'bom_prediction': bom_prediction,
        'pom_prediction': pom_prediction
    }
    
    result = collection.insert_one(prediction_data)

    # Convert ObjectId to string for JSON serialization
    prediction_data['_id'] = str(result.inserted_id)

    return jsonify(prediction_data)

########################################################################################
# /add_predict_shop_demand_aom

@app.route('/add_predict_shop_demand_aom', methods=['POST'])
def predict_aom():

    data = request.get_json()
    aom_var = data.get('aom_var')
    
    if aom_var is None:
        return jsonify({'error': 'Please provide aom_var'}), 400

    param = tf.convert_to_tensor(np.array([[aom_var]]))


    aom_cy_yearly_pred =  int( tf.math.ceil( aom_cy_yearly_model.predict(param)[0][0] ) )
    aom_cy_monthly_pred = int( tf.math.ceil( aom_cy_monthly_model.predict(param)[0][0] ) )
    aom_fy_yearly_pred = int( tf.math.ceil( aom_fy_yearly_model.predict(param)[0][0] ) )
    aom_fy_monthly_pred = int( tf.math.ceil( aom_fy_monthly_model.predict(param)[0][0] ) )

    
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predictShopDemandAom']

    # Save predictions to MongoDB
    prediction_data = {
        'current_daily_sales': aom_var,
        'aom_cy_yearly_pred': aom_cy_yearly_pred,
        'aom_cy_monthly_pred': aom_cy_monthly_pred,
        'aom_fy_yearly_pred': aom_fy_yearly_pred,
        'aom_fy_monthly_pred': aom_fy_monthly_pred
    }
    
    result = collection.insert_one(prediction_data)
    prediction_data['_id'] = str(result.inserted_id)

    return jsonify(prediction_data)

########################################################################################
# /add_predict_shop_demand_am

@app.route('/add_predict_shop_demand_am', methods=['POST'])
def predict_am():

    data = request.get_json()
    am_var = data.get('am_var')
    
    if am_var is None:
        return jsonify({'error': 'Please provide am_var'}), 400

    param = tf.convert_to_tensor(np.array([[am_var]]))


    am_cy_yearly_pred =  int( tf.math.ceil( am_cy_yearly_model.predict(param)[0][0] ) )
    am_cy_monthly_pred = int( tf.math.ceil( am_cy_monthly_model.predict(param)[0][0] ) )
    am_fy_yearly_pred = int( tf.math.ceil( am_fy_yearly_model.predict(param)[0][0] ) )
    am_fy_monthly_pred = int( tf.math.ceil( am_fy_monthly_model.predict(param)[0][0] ) )

    
    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predictShopDemandAm']

    # Save predictions to MongoDB
    prediction_data = {
        'current_daily_sales': am_var,
        'am_cy_yearly_pred': am_cy_yearly_pred,
        'am_cy_monthly_pred': am_cy_monthly_pred,
        'am_fy_yearly_pred': am_fy_yearly_pred,
        'am_fy_monthly_pred': am_fy_monthly_pred
    }
    
    result = collection.insert_one(prediction_data)
    prediction_data['_id'] = str(result.inserted_id)

    return jsonify(prediction_data)

########################################################################################
# /get_predict_customer_demand

@app.route('/get_predict_customer_demand', methods=['GET'])
def get_latest_weight_predictions():

    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predict_demand_weights']

    latest_prediction = collection.find_one(sort=[('_id', -1)])

    if latest_prediction is None:
        return jsonify({'error': 'No prediction data found'}), 404

    latest_prediction['_id'] = str(latest_prediction['_id'])
    return jsonify(latest_prediction)

########################################################################################
# /get_predict_shop_demand_aom

@app.route('/get_predict_shop_demand_aom', methods=['GET'])
def get_latest_aom_prediction():

    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predict_demand_shop_aom']

    latest_prediction = collection.find_one(sort=[('_id', -1)])

    if latest_prediction is None:
        return jsonify({'error': 'No prediction data found'}), 404

    latest_prediction['_id'] = str(latest_prediction['_id'])
    return jsonify(latest_prediction)

########################################################################################
# /get_predict_shop_demand_am

@app.route('/get_predict_shop_demand_am', methods=['GET'])
def get_latest_am_prediction():

    # Connect to MongoDB
    client = MongoClient('mongodb+srv://it21034268:oKNtVV3QK83Vu8S8@demandpred.kvxbz.mongodb.net/?retryWrites=true&w=majority&appName=demandPred')
    db = client['demandPred']
    collection = db['predict_demand_shop_am']

    latest_prediction = collection.find_one(sort=[('_id', -1)])

    if latest_prediction is None:
        return jsonify({'error': 'No prediction data found'}), 404

    latest_prediction['_id'] = str(latest_prediction['_id'])
    return jsonify(latest_prediction)


########################################################################################

if __name__ == '__main__':
    app.run(debug=True)