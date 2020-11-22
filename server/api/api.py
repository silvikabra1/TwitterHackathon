import flask;


app = flask.Flask(__name__)

@app.route('/api/tweets/', methods=['GET'])
def api_screen_name():
  if 'screen_name' in request.args:
    screen_name = request.args['screen_name']
  else:
    return "Error"
  

app.run();
