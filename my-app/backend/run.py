from gevent.pywsgi import WSGIServer
from base import api

# As flask is not a production suitable server, we use will
# a WSGIServer instance to serve our flask application.
if __name__ == '__main__':
    WSGIServer(('0.0.0.0', 8000), api).serve_forever()