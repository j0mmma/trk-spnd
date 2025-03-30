from flask import Flask
from flask_cors import CORS
from controllers.user_controller import user_bp

app = Flask(__name__)
CORS(app)  # Allow all origins by default

app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(debug=True)
