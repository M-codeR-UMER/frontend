Regenerte client API 

#1 npm install -D openapi-typescript

#2 npm run api:generate

P.S: http://127.0.0.1:8000/openapi.json should be live.

And Inside package.json file:- 
    Under Scripts this should exit:- 
    "api:generate": "openapi-typescript http://127.0.0.1:8000/openapi.json -o app/api/generated/client.ts"