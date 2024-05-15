import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import ItemScreen from "./components/ItemsScreen";
import {CenteredChat} from "./components/CenteredChatComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/items" element={<ItemScreen />} />
        <Route path="/chat" element={<CenteredChat />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
