# Stock Technical Challenge

## Description

Problem: Write a simple web server that performs the following task: a GraphQL API that takes a CSV file as an
input and returns the following:

a. The stock code that has the biggest growth rate.

b. The stock code that has the smallest growth rate.

## Tech Stack

- NodeJs
- NestJs
- Typescript
- Graphql

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

> http://localhost:3000/graphql

You can try by below commands

```bash
curl --location --request POST 'http://localhost:3000/graphql' \
--form 'operations="{ \"query\": \"mutation($file: Upload!) { getMinMaxGrowthStockFromFile(file: $file) { min { code growth } max { code growth }}}\", \"variables\": { \"file\": null } }
"' \
--form 'map="{ \"0\": [\"variables.file\"] }"' \
--form '0=@"/path/to/data.csv"'
```
```bash
http --ignore-stdin --form --follow --timeout 3600 POST 'http://localhost:3000/graphql' \
 'operations'='{ "query": "mutation($file: Upload!) { getMinMaxGrowthStockFromFile(file: $file) { min { code growth} max { code growth}}}", "variables": { "file": null } }
' \
 'map'='{ "0": ["variables.file"] }' \
 '0'@/path/to/data.csv
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# using docker-compose
$ docker compose up
```

## Track

- [x] Graphql upload & resolve data
- [x] Docker setup
- [x] Optimize code

> Should use queue for scalability and high availability

## License

[MIT licensed](LICENSE).
