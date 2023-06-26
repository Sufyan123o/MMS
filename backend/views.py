from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from flask import current_app as app

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/api/s001-driver-form', methods=['POST'])
def s001_driver_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

#Chekcs if file is allowed
def allowed_file(filename, app):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


#Upload Pictures Method
@api_blueprint.route('/api/upload', methods=['POST'])
def upload_file():
    #Import the current flask app running as 'app'
    if 'image' not in request.files: #check that request didnt contain a file upload as expected 
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '': # Check if a file was actually selected and uploaded
        # If not, return a JSON error message
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename, app):
        filename = datetime.now().strftime('%Y%m%d%H%M%S') #uses date and time as file name
        extension = secure_filename(file.filename).rsplit('.', 1)[1].lower()
        filename = "{}.{}".format(filename, extension)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) #saves file to upload folder
        # Return a JSON response with the URL of the uploaded file
        return jsonify({"url": os.path.join(app.config['UPLOAD_FOLDER'], filename)}), 200

    # If the file is not allowed, return a JSON error message
    return jsonify({"error": "File not allowed"}), 400

@api_blueprint.route('/api/s001-finance-form', methods=['POST'])
def s001_finance_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

@api_blueprint.route('/api/s001-janghir-sign', methods=['POST'])
def s001_janghir_sign():
    pass



# This defines a route for the '/api/test' URL. It returns a simple JSON response for testing.
@api_blueprint.route('/api/test')
def test():
    data = {"data": "test"}
    return jsonify(data)

