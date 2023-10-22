
$commit_id = git rev-parse HEAD
Write-Host "Commit Id: $commit_id"
$json_location = Join-Path $PSScriptRoot "commit_id.json"
$content = "{""commit_id"":""$commit_id""}"
Write-Host "Save to $json_location "
Set-Content -Path $json_location  -Value $content -Encoding Ascii #Use Ascii to save without BOM

#Build docker image
docker build -t gpt_proxy .
docker tag gpt_proxy:latest woodychang0611/gpt_proxy:latest
#Push to docker Hub
docker push woodychang0611/gpt_proxy:latest