from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.json
    print("Received data:", data)  # Add a print statement for debugging
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)