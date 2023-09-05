const db = require('./config/db'); // Adjust the path if needed
let myConnection;



async function addIngredient(ingredients,recipeId) {
    try { 
      myConnection = await db.connect();
  
      const insertQuery = `INSERT INTO ingredients (recipe_id, description, quantity, unit) VALUES (?, ?, ?, ?);`;
  
      for (let element of ingredients) {
        const values = [recipeId, element.ingredient, element.quantity, element.type];
        await myConnection.execute(insertQuery, values);
      }
    } catch (error) {
      throw new Error('Can not add the ingredients');
    }
  }
  
async function deleteIngredient(id){

    myConnection = await db.connect();
 
     try {
         await myConnection.execute(`DELETE FROM recipe_management.ingredients WHERE recipe_id = ${id}`);
       } catch (err) {
         throw new Error('Can not deletes the ingredients');
       }
 }



module.exports = {
    deleteIngredient,
    addIngredient,
  };

