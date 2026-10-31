from flask import Flask, render_template, request, jsonify
from random import choice

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/rules")
def rules():
    return "If you get HEADS you WIN"

@app.route("/toss", methods=["POST"])
def toss():
    coin = choice(["heads", "tails"])

    if coin == "heads":
        result = "YOU WIN"
    else:
        result = "YOU LOSE"

    return jsonify({
        "coin": coin,
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)