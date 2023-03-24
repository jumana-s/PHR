FROM ubuntu:20.04

WORKDIR /app

RUN apt update && apt install -y software-properties-common 

# Install python3.7
RUN apt update && add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install -y python3.7 python3.7-dev python3-pip python3.7-distutils

# Install dependencies
RUN apt install -y libgmp10 libgmp-dev
RUN apt install -y openssl libssl-dev
RUN apt update && apt install -y git wget flex bison sudo virtualenv

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
RUN update-alternatives --config python3

# clone charm repo
RUN git clone https://github.com/JHUISI/charm
WORKDIR /app/charm
RUN pip install -r requirements.txt

# build charm
RUN ./configure.sh
WORKDIR /app/charm/deps/pbc
RUN make && ldconfig 
WORKDIR /app/charm
RUN make
RUN make install && ldconfig

RUN make test

RUN pip install flask python-dotenv flask_jwt_extended psycopg2-binary gevent flask-cors

COPY . /app/charm

EXPOSE 8000
CMD ["python3.7", "run.py"]
