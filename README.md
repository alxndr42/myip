# myip

A simple "What is my IP address?" application in [Flask][].

[flask]: https://flask.palletsprojects.com/

## Usage

In addition to the [HTML page][], plain-text and JSON responses are supported:

```bash
$ curl ip.ybti.net
192.0.2.1

$ curl ip.ybti.net -6 -H 'Accept: application/json'
{"ip":"2001:db8::1"}
```

[html page]: https://ip.ybti.net/
