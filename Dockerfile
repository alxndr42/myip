###
### Build Image
###

# .python-version
FROM python:3.12-slim AS build

ENV PIPENV_VENV_IN_PROJECT=1

WORKDIR /app

COPY Pipfile.lock Pipfile /app/

RUN pip install pipenv
RUN pipenv sync

###
### Runtime Image
###

# .python-version
FROM python:3.12-slim AS runtime

ENV PATH=$PATH:/app/.venv/bin

RUN adduser app
USER app

WORKDIR /app

COPY --chown=app:app --from=build /app/.venv/ /app/.venv/
COPY --chown=app:app static/ /app/static/
COPY --chown=app:app templates/ /app/templates/
COPY --chown=app:app app.py /app/

EXPOSE 8000
CMD ["gunicorn", "--bind=0.0.0.0:8000", "app:app"]
