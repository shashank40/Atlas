import axios from "axios";

export const SignInTokenCheck = async (token: string | null) => {
  const response = await axios.post("http://localhost:8000/verify-token", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};


export const SignInRequest = async (data: FormData) => {
  const response =  axios.post("http://localhost:8000/token", data);
  return response;
};
