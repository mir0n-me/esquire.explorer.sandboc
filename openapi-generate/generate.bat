call openapi-generator-cli generate -g  nodejs-express-server -o ../backend -i esqSandboxApi.yaml -c config.server.yaml -t templates.server > ../logs/generate.server.log

call openapi-generator-cli generate -g  typescript-angular -o ../frontend/src/rest -i esqSandboxApi.yaml -t templates.restApi > ../logs/generate.restApi.log

rem openapi-generator-cli author template -g nodejs-express-server -o temp-nes
