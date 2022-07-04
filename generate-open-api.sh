#!/bin/bash
docker-compose build
docker-compose up -d
echo "Wainting for swagger file"
while ! curl --output /dev/null --silent --head --fail http://localhost:3005/api-json/; do
 sleep 1 && echo -n .;
done;
echo "Downloading swagger file"
curl --silent http://localhost:3005/api-json/ -o swagger.json
echo "generating .ts from swagger"
npx swagger-typescript-api -p ./swagger.json -o ./client-ui -n index.ts -t ./swagger/templates/default --union-enums
