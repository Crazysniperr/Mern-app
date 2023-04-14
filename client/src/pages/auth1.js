import {useState} from 'react';
import axios from 'axios';//use to fetch the data from the database
import { useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import "../css/auth.css"
export const Auth = () => {
    return(
        <div className="auth">
            <Register/>
            <Login/>
        </div>
    );
};


const Login = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

   const [,setCookie] = useCookies(['access'])//to gain acces to the cookies according to user, access token are gained using the JWT in the backend.

    const navigate = useNavigate();//this function is used to navigate to the given path.
    const onSubmit = async (e)=>{
        e.preventDefault();//stops the form to refresh page when submitting
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
          }
        try{
            const response = await axios.post("http://localhost:3001/auth/login",{username,password});
            console.log(response.data.token);
            setCookie('access',response.data.token);//the acess token cookies have been give the value of the token given by the jwt backend.
            window.localStorage.setItem("userId",response.data.userId);
            navigate("/");//use to navigate to the path

            
        } catch(err){
            console.error("An error occurred");
            alert("wrong user");

        }


    }
    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="LogIn" onSubmit={onSubmit}/>            
    );

    
}




const Register = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [,setCookie] = useCookies(['access']);
    const onSubmit = async (e)=>{
        e.preventDefault();//stops the form to refresh page when submitting
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
          }
        try{
            await axios.post("http://localhost:3001/auth/register",{username,password});
            alert("Registeration Completed! Now you can login");
        } catch(err){
            console.error("An error occurred");

        }


    };

    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>
    );

};

const Form =({username,setUsername,password,setPassword,label,onSubmit})=>{
    return(
        <div className="auth-container">
            <form onSubmit={onSubmit} className="form" autoComplete='off'>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit' className='bttn'>{label}</button>

                
            </form>

        </div>
);

}