
docker build -t gpt_proxy .
docker tag gpt_proxy:latest woodychang0611/gpt_proxy:latest
docker push woodychang0611/gpt_proxy:latest