#clean up build
Remove-Item $PSScriptRoot/build -Recurse -Force
docker build -t gpt_proxy .
docker rm my_gpt_proxy -f
docker run --name my_gpt_proxy -p 80:80 gpt_proxy

