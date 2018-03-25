# Reference for commands used during development

## Knex
- Generate migration file
    - `knex migrate:make {model_name}`
- Run migrations for development environment
    - `knex migrate:latest --env development`
- Run seeds for development environment
    - `knex seed:run --env development`
