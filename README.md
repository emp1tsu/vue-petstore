# vue-petstore

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Start Pet Store API

```
docker pull openapitools/openapi-petstore
docker run -d -e OPENAPI_BASE_PATH=/v3 -e DISABLE_OAUTH=1 -p 2345:8080 openapitools/openapi-petstore
```


### TODO

- [ ] Home画面
- [ ] ペット一覧画面
- [ ] ペット詳細画面