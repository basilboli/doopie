import simplejson, requests
from flask import Flask, request, Response
from flask.ext.pymongo import PyMongo
from datetime import datetime
import time

app = Flask("doopie")
mongo = PyMongo(app)

@app.route("/")
def hello():
    return "It works!"

@app.route("/api/v1/checkin", methods = ['GET'])
def doopie():
    callback = request.args.get('cb', None)
    if request.method == 'GET':
        checkins = mongo.db.checkins.find_one()
        if not checkins:
            return jsonify({'error':"No checkins yet", "checkins": 0})
    return jsonify(checkins)

def get_checkin(place=None):
    return {
        'user': 'doopie', 'place':place,
        "datetime": str(time.mktime(datetime.now().timetuple()))
    }

def jsonify(text, callback = None):
    print text
    if text.has_key('_id'):
        del text['_id']
    res = simplejson.dumps(text, ensure_ascii=False)
    if callback:
        res = callback + '(' + res + ');'
    return Response(
            res,
            mimetype='text/javascript'
    )

if __name__ == "__main__":
    app.run(debug=True)

