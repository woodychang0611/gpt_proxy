
docker build -t gpt_proxy .
docker rm my_gpt_proxy -f
docker run --rm --name my_gpt_proxy -p 80:80 gpt_proxy

