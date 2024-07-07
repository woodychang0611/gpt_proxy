docker compose down
docker build -t gpt_proxy .
docker run --rm --name my_gpt_proxy -p 80:80 gpt_proxy

