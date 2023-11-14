from enum import Enum
import os

from flask import Flask, request
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)
if os.environ.get('MYIP_PROXY') == 'true':
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)


class ResponseType(Enum):
    """Supported response content types."""
    TEXT = 1
    JSON = 2
    HTML = 3


@app.route('/')
def root():
    response_type = get_response_type()
    if response_type == ResponseType.JSON:
        return {'ip': request.remote_addr}
    else:
        body = f'{request.remote_addr}\n'
        headers = {'Content-Type': 'text/plain'}
        return (body, headers)


def get_response_type():
    """Return the preferred ResponseType."""
    for item in request.accept_mimetypes:
        if item[0] == 'text/html':
            return ResponseType.HTML
        if item[0] == 'application/json':
            return ResponseType.JSON
    else:
        return ResponseType.TEXT
