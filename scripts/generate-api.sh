# node node_modules/swagger-typescript-codegen/bin/swagger2ts.js generate ../newlife-creator-api/docs/creator.swagger.json > ./index.ts

# consider --type-prefix Newlife 
# swagger-typescript-api  -p ../../apps/chainstream-api/docs/api.swagger.json -n index-alt && tsc
swagger-typescript-api  --templates ./src/templates/base -p ../../apps/chainstream-api/docs/api.swagger.json -n src/clients/http/client
vite build
