# Reference for commands used during development

## Knex
- Generate migration file
    - `knex migrate:make {model_name}`
- Run migrations for development environment
    - `knex migrate:latest --env development`
- Run seeds for development environment
    - `knex seed:run --env development`
- Rollback
    - `knex migrate:rollback`

## New Entity Creation Order
- Generate migration for table
    - `knex migrate:make {model_name}`
    - fill in migration details
    - `knex migrate:latest --env development`
- Create model file for model validation
    - `server/models/{model_name}`
- Create seed data if applicable
    - `server/db/seeds/{model_name}`
- Create routes file for api routes
    - `server/routes/{model_name}`
- create queries file for SQL queries
    - `server/db/queries/{model_name}`

