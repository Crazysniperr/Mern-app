import React, { useState } from "react";
import axios from "axios";

function DeleteRecipe({ recipe, userId, onRecipeDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/savedRecipes/${userId}/${recipe._id}`);
      onRecipeDelete(recipe._id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteRecipe;
