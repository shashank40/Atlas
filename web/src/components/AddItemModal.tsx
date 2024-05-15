import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import {AddItem , IAddItem} from '../hooks/AddItem'

export default function BasicModalDialog(prop) {

const [title, setTitle] = React.useState('');
const [description, setDescription] = React.useState('');

  return (
    <React.Fragment>
      <Modal open={prop.open} onClose={() => prop.setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogContent>Fill in the information of the item.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
                const data: IAddItem = {
                    title: title,
                    description: description,
                }
                AddItem(localStorage.getItem('token'), data).then((res) => {
                  if (res.status === 200) {
                    prop.setOpen(false);
                    prop.setRowCount(prop.rowCount + 1)
                  }
                }).catch(() => {alert("Invalid credentials")});
              prop.setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input autoFocus required onChange={(e) => {setTitle(e.target.value)}}/>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required onChange={(e) => {setDescription(e.target.value)}}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
