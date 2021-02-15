FROM python:3.7

WORKDIR /app/api
COPY requirements.txt /app/api
RUN pip install -r requirements.txt

ENV FLASK_APP=app.py

EXPOSE 8000

CMD ['python', 'app.py']