# Lessons Learned
Brief, scattered notes about what I learned from this process

## Database
- Migrations involving changing enums, especially shortening them or lengthing them can cause problems when you try to rollback enum column changes.
  - One instance is when I changed an enum error when running tests that would rollback a change I did to an enum column:

```
Knex:warning - migration failed with error: alter table `chip` modify `element` enum('null', 'fire', 'aqua', 'elec', 'wood', 'sword', 'wind', 'cursor', 'break', 'plus_minus', 'recovery', 'block'), modify `damage` int null - Data truncated for column 'element' at row 138
```

- Another thing to watch out for is autoincrement indices. These would typically be the primary key for a column that would continually increment every time I reseeded the data. The fix for this would be to reset the autoincrement counter in the DBMS itself for each table.
  - Ex. `return knex.raw('ALTER TABLE chip AUTO_INCREMENT = 0')`
  - Failure to do so would make it so your primary key id numbers continually increasing over time, which makes it more difficult to perform tests or have seeded foreign keys between data unless you make sure to fetch the data by some other candidate key before setting the foreign key

## Node.js
- Still not 100% sure on koajs + objectionjs. Expressjs and sequelize may have been a better choice due to their maturity and adoption rate.
- It is difficult to find a community to ask koajs questions about, besides their github issues page

## General Backend
- Use mature, popular, regularly updated libraries. They will have the most resources available, best documentation, and issues already solved in comparison to other libraries.
- From the get go, have a way to standardize outputting errors so its easier to consume by the front end.
  - Look up restful api design patterns in terms of nesting child elements
- Designing database diagram was a good idea and helped thinking through how everything worked.
- separate controller actions from routes.
- when writing tests, try to mock database calls to make the tests run faster.

## General Development
- After the first few models, I ended up repeating the CRUD actions for a lot of my models. Maybe use yaml or some other tool to auto generate these models after the first few if they are really similar.


## Server
