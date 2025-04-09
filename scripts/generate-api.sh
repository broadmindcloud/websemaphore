swagger-typescript-api  --templates ./src/templates/base -p ../../apps/chainstream-api/docs/api.swagger.json -n src/clients/http/api
# . ~/scripts/ts-debug.sh node_modules/swagger-typescript-api/dist/cli.js  --templates ./src/templates/base -p ../../apps/chainstream-api/docs/api.swagger.json -n src/clients/http/api

vite build
