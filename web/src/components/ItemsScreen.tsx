import TableComponent from "./Table";
import Button from "@mui/material/Button";
import Typography from '@mui/joy/Typography';
import PermanentDrawerLeft from "./Drawer";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { SignInTokenCheck } from '../hooks/SignIn';
import { useEffect, useState } from "react";
import BasicModalDialog from "./AddItemModal";

export default function ItemScreen(): JSX.Element {

  const navigate = useNavigate();
 const token: string | null = localStorage.getItem('token');

  function handleLogout () {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    if(token !== null) {
      SignInTokenCheck(token).then((response) => {
        if(response.status === 200) {
          navigate("/items");
        }
      }).catch(() => {console.log("reached here")
        navigate("/")});
    }
    else {
      navigate("/");
    }
  }, []);

  const [modalOpren, setModalOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  return (
    <div className="flex justify-between items-center">
    <BasicModalDialog open={modalOpren} setOpen={setModalOpen} rowCount={rowCount} setRowCount={setRowCount}/>
    <PermanentDrawerLeft setModalOpen={setModalOpen}/>
    <Box component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Button sx={{ marginLeft: 170 }} variant="contained" href="" className="align-middle" onClick={() => {handleLogout()}}>
        Logout
      </Button>
      <Typography level="title-lg" sx={{ opacity: '70%', marginLeft: 92, marginTop: 10, fontSize: 28 }}>
          User Items{' '}
        </Typography>
      <TableComponent token = {token} rowCount={rowCount} setRowCount={setRowCount}/>
      </Box>
    </div>
  );
}
