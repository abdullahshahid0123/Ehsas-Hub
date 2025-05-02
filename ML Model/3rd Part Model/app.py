from flask import Flask
from routes import register_blueprints
from flask_cors import CORS


app = Flask(__name__)
register_blueprints(app)
CORS(app)  # This will enable CORS for all routes


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
