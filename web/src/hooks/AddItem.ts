import axios from "axios";

export interface IAddItem{
    title: string;
    description: string;

}
export const AddItem = async (token: string | null, data:IAddItem ) => {
    const response = await axios.post("http://localhost:8000/users/add/item", data,{
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return response;
  };