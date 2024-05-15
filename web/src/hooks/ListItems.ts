import axios from "axios";


export const ListItems = async (token: string | null) => {
    const response = await axios.get("http://localhost:8000/users/me/items/",{
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return response;
  };