from flask import Flask, render_template

app = Flask(__name__)

users = [
    {"id": 1, "name": "test1"},
    {"id": 2, "name": "test2"},
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/users", methods=["GET"])
def get_users():
    return render_template("index.html", userlist=users)


if __name__ == "__main__":
    app.run(debug=True)
