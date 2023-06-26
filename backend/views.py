from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os

api_blueprint = Blueprint('api', __name__)

############################## File Upload #####################################

# Checks if file is allowed
def allowed_file(filename, app):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Upload Pictures Method
@api_blueprint.route('/api/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    urls = []  #store all the urls here
    files = request.files.getlist("image")  # get the list of files from 'image'

    for file in files:
        if file.filename == '':  # Check if a file was actually selected and uploaded
            return jsonify({"error": "No selected file"}), 400
        
        if file and allowed_file(file.filename, app):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)  # save file to upload folder
            urls.append(file_path)  # append the file_path to urls list

        else:
            # If the file is not allowed, return a JSON error message
            return jsonify({"error": "File not allowed"}), 400
    
    # Return a JSON response with the URL of the uploaded files
    return jsonify({"urls": urls}), 200


######################################## S001 #########################################

@api_blueprint.route('/api/s001-driver-form', methods=['POST'])
def s001_driver_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500


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

################################### S002 #########################################

@api_blueprint.route('/api/s002-supplier-info-form', methods=['POST'])
def s002_supplier_info_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

################################### S003 #########################################

@api_blueprint.route('/api/s003--driver-entry-form', methods=['POST'])
def s003_driver_entry_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

@api_blueprint.route('/api/s003--finance-entry-form', methods=['POST'])
def s003_finance_entry_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

################################### S004 #########################################

@api_blueprint.route('/api/s004--driver-exit-form', methods=['POST'])
def s004_driver_exit_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

@api_blueprint.route('/api/s004--finance-exit-form', methods=['POST'])
def s004_finance_exit_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

@api_blueprint.route('/api/s004--forklift-exit-form', methods=['POST'])
def s004_forklift_exit_form():
    try:
        data = request.get_json()
        print(data)
        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500

###################### Test ##########################

# This defines a route for the '/api/test' URL. It returns a simple JSON response for testing.
@api_blueprint.route('/api/test')
def test():
    data = {"data": "test"}
    return jsonify(data)

