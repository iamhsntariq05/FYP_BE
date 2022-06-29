docker build --tag nodeapp:latest .
docker container rm
    $(docker container ls -af name=nodeapp -q)
docker run -it --name nodeapp -p 8000:8000 nodeapp
