#!/usr/bin/env python3

from __future__ import print_function
from flask import Flask, render_template, request
import os.path
import smtplib
from sendMail import send_mail

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    # posting email
    if request.method == 'POST':
        form = request.form
        print(form['trapit'])
        # checking for bot email and denying
        if form['trapit'] is not None and form['trapit'] != "":
            return render_template("contact.html", submit = "denied")
        try:
            send_mail(form)
        except Exception as inst: 
            print(type(inst))    # the exception instance
            print(inst.args)     # arguments stored in .args
            print(inst)          # __str__ allows args to be printed directly,
            return render_template("contact.html", submit = "denied")

        # after sending, (assuming it's successful), return to the normal page with success message
        print("EMAIL SEND ACCEPTED")
        return render_template("contact.html", submit = "accepted")
    else:
        return render_template("contact.html", submit = "none")

@app.route("/resume")
def resume():
    return render_template("resume.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/socials")
def insta(): 
    return render_template("socials.html")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("not-found.html"), 404

@app.errorhandler(500)
def server_error(e):
    return render_template("server-error.html"), 500


if __name__ == "__main__":
    app.run(debug=False)
