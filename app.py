from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load model
interpreter = tf.lite.Interpreter(model_path="waste_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
labels = ['battery', 'glass', 'metal', 'organic', 'paper', 'plastic']
IMG_SIZE = 224

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = np.expand_dims(img / 255.0, axis=0).astype(np.float32)

    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]['index'])
    prediction = np.argmax(output)
    label = labels[prediction]

    return jsonify({'prediction': label})

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
