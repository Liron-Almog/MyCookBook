## Tables

### Users

- **user_id**: A unique identifier for each user.
- **user_name**: The username of the user.
- **first_name**: The user's first name (optional).
- **last_name**: The user's last name (optional).
- **email**: The user's email address (unique and required).
- **password**: The user's password for authentication.

### Recipes

- **recipe_id**: A unique identifier for each recipe.
- **user_id**: A foreign key referencing the Users table to associate recipes with users.
- **recipe_name**: The name of the recipe (unique and required).
- **preparation_time**: The time required for recipe preparation (in minutes).
- **cooking_time**: The time required for cooking the recipe (in minutes).
- **instructions**: Detailed cooking instructions for the recipe.

### Ingredients

- **ingredient_id**: A unique identifier for each ingredient.
- **user_id**: A foreign key referencing the Users table to associate ingredients with users.
- **description**: A textual description of the ingredient (required).
- **quantity**: The quantity of the ingredient required.
- **unit**: The unit of measurement for the quantity.

![er-diagram](https://github.com/Liron-Almog/MyCookBook/assets/100926289/5b903036-ca74-4e21-972c-aa220de34c4a)






