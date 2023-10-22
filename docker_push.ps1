
$commit_id = git rev-parse HEAD
$commit_id 

$json_location = Join-Path $PSScriptRoot "commit_id.json"
$content = "{""commit_id"":""$commit_id""}" 
$json_location 
$content
Set-Content -Path $json_location  -Value $content -Encoding Ascii #Use Ascii to save without BOM
return
docker build -t gpt_proxy .
docker tag gpt_proxy:latest woodychang0611/gpt_proxy:latest
docker push woodychang0611/gpt_proxy:latest