import os

from flask import Flask, request
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)
if os.environ.get('MYIP_PROXY') == 'true':
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)


@app.route('/')
def root():
    body = f'{request.remote_addr}\n'
    headers = {'Content-Type': 'text/plain'}
    return (body, headers)
