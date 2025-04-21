import json
from flask import Flask, request, jsonify
from prediction_service import predict_from_json  # Assuming you saved the above code as prediction_service.py

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        prediction_type = data.get('prediction_type')
        input_data = json.dumps(data.get('features'))  # Assuming 'features' key in JSON

        if not prediction_type or not input_data:
            return jsonify({"error": "Missing 'prediction_type' or 'features' in request"}), 400

        output = predict_from_json(input_data, prediction_type)
        return jsonify(json.loads(output)), 200
    except Exception as e:
        return jsonify({"error": f"Error processing request: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)