#!/usr/bin/env python3

from __future__ import print_function
from flask import Flask, render_template, request
import os.path

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    # removed page. redirect to home
    return redirect("/", code=302)

@app.route("/resume")
def resume():
    return render_template("resume.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/about")
def about():
# removed page. redirect to home
    return redirect("/", code=302)

@app.route("/socials")
def socials(): 
    return render_template("socials.html")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("not-found.html"), 404

@app.errorhandler(500)
def server_error(e):
    return render_template("server-error.html"), 500


if __name__ == "__main__":
    app.run(debug=False)
