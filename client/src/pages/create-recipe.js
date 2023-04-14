import axios from 'axios';
import {useState} from 'react';
import { useGetUserId } from '../hooks/useGetUserId';
import {useNavigate} from 'react-router-dom';
import "../css/create-recipe.css";
import { useCookies} from 'react-cookie';

export const CreateRecipe = () => {
    const userID = useGetUserId();
    const [cookies,] = useCookies(['access'])
    const [recipe, setRecipe] = useState({
        name:"",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();
    
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRecipe({...recipe,[name]:value});//inputing the value into according to there name
    }

    const handleIngredientChange = (e,idx) => {
        const {value} = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe,ingredients});//inputing the value into according to there name
        
    }

    const addIngredient = () => {
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});//adding a blank space or list in ingredients
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = cookies.access;
            await axios.post("http://localhost:3001/recipes", recipe,
            {headers: {
                Authorization: `Bearer ${token}`,
              }});
            alert("Recipe created successfully");
            navigate("/");
        }catch(err){
            console.error(err);
        }

    }

    return (
        <div className="container" style={{color:'#fff'}}>
            <div className="create-recipe"> 
                <h2>Create Recipe</h2>
                <form onSubmit={onSubmit} className='formm' autoComplete="off">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' autoComplete="off" onChange={handleChange}/>
                    <label htmlFor="ingredients">Ingredients</label>
                    {recipe.ingredients.map((ingredient,idx) =>(
                        <input key={idx} type="text" id="ingredient" value={ingredient} onChange={(e) => handleIngredientChange(e,idx)}/>

                    ))}
                    <button className='bttn' onClick={addIngredient} type="button">Add Ingredient</button>


                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name="instructions" onChange={handleChange}></textarea >
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
                    <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                    <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
                    
                    <button className='bttn' type="submit">Click here to submit</button>
                </form>
            </div>
    </div>
    );
};