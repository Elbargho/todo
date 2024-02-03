from flask import Flask, render_template
from flask_cors import CORS
from routers import tasksRouter, trackerRouter, notesRouter
from configparser import ConfigParser

app = Flask(
    __name__, static_url_path="", static_folder="build", template_folder="build"
)
CORS(app)
config = ConfigParser()

tasks_blueprint = tasksRouter.tasks_bp
tracker_blueprint = trackerRouter.tracker_bp
notes_blueprint = notesRouter.notes_bp

app.register_blueprint(tasks_blueprint, url_prefix="/tasks")
app.register_blueprint(tracker_blueprint, url_prefix="/tracker")
app.register_blueprint(notes_blueprint, url_prefix="/notes")


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    config.read("../devops/config.properties")
    debug = config.getboolean("DEBUG", "debug")
    app.run(host="0.0.0.0", port=5000, debug=debug)
