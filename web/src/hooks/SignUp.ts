import axios from 'axios';


export interface ISignupData{
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export const SignUpRequest  = async (data: ISignupData) => {

    try {
    await axios.post('http://localhost:8000/signup', data)
    
    }
    catch (error){
        alert(`Error in signing up ${error})}`)
    }
}