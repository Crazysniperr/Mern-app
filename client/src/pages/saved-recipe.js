import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";
import "../css/home.css";

export const SavedRecipe = () => {
  const [savedRecipes, setsavedRecipes] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
          setsavedRecipes(response.data.savedRecipes);
        //   console.log(response.data);
        //   console.log(savedRecipes.data)
        } catch (err) {
          console.log(err);
        }
      };

    fetchSavedRecipes();
  }, []);


  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(
        `http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`
      );
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/${userID}`
      );
      setsavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="containerr">
      <h1>Saved Recipes</h1>
      {savedRecipes && savedRecipes.length>0? (
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
            </div>

            <div className="ingredients">
              {recipe.ingredients.map((imp)=>(
                <p>{imp}</p>
              ))}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p  >Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>) : (<h2>No saved recipes </h2>)}
    </div>
  );
};