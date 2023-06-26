from flask import Flask
import os
from views import api_blueprint

app = Flask(__name__)

upload_folder = os.path.abspath('uploads/')

if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)

app.config['UPLOAD_FOLDER'] = upload_folder

# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

app.register_blueprint(api_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
