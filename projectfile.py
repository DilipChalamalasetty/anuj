from flask import Flask,render_template,url_for,flash,redirect,request,jsonify
from datetime import datetime

app=Flask(__name__)
app.config['SECRET_KEY']='24fbcde8e1de3d3404d190895b9b4093'


@app.route("/",methods=['GET','POST'])
def jsondata():
    req_data = request.get_json()
    print(req_data)
    #req_data is the data that comes in .
    #prediction=model(req_data)
    return jsonify({"prediction": "place prediction here"})



if __name__ == '__main__':
    app.run(debug=True, port=5000)