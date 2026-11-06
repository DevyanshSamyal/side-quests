from flask import Flask, render_template, request, jsonify
from random import choice
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

app.wsgi_app = ProxyFix(
    app.wsgi_app,
    x_prefix=1
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/rules")
def rules():
    return "STONE beats scissors, SCISSORS beat paper, PAPER beats stone!!"

@app.route("/play-game", methods=["POST"])
def play_game():
    data = request.get_json()
    player_move = data["player_move"]
    if player_move not in ["stone", "paper", "scissors"]:
        return jsonify({"error": "Invalid move"}), 400
    
    choices=["stone", "paper", "scissors"]
    computer = choice(choices)
    
    if computer == player_move:
        result= "DRAW"
    elif computer=="stone" and player_move=="scissors" or \
        computer=="paper" and player_move=="stone" or \
        computer=="scissors" and player_move=="paper":
        result= "Computer WINS"
    else:
        result= "You WIN"

    return jsonify({
        "player_move": player_move,
        "computer_move": computer,
        "result": result
    }) 

if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host="0.0.0.0", port=5000, debug=True)