from flask import Flask, request, jsonify

app = Flask(__name__)


# put these following routes in views.py
# look at https://realpython.com/flask-blueprint/


# not working now
@app.route('/api/s001-driver-form', methods=['POST'])
def s001_driver_form():
    try:
        data = request.get_json()
        # process data
        print(data)

        return jsonify({'message': 'Data received successfully'}), 200
    except Exception as e:

        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500


# access route by doing `http://localhost:5000/api/test` into browser
# use incognitio for testing to avoid cache
@app.route('/api/test')
def test():
    data = {"data": "test"}
    return jsonify(data)


# to run do flask run in console (with venv running and cd backend)
if __name__ == '__main__':
    app.run(debug=True)