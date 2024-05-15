import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ListItems } from "../hooks/ListItems";
import { useCallback, useState } from "react";

function createData(
  id: string,
  item: string,
  desciption: string,
  owner_id: string
) {
  return { id, item, desciption, owner_id };
}

let data: any = [];

async function Rows(token: string | null) {
  try {
    const resp = await ListItems(token);
    data = resp.data;
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    console.log(e);
  }

}

export default function TableComponent(props: any) {

  props.setRowCount(data.length);
  const fetchRows = useCallback(() => {Rows(props.token);}, [props.rowCount, props.token])
  fetchRows();

  const rows = data.map((item) => {
    return createData(item.id, item.title, item.description, item.ownerId);
  });

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          alignItems: "center",
          maxWidth: 1200,
          minWidth: 750,
          background: "#edf28d",
          margin: "auto",
          marginTop: 30,
          marginLeft: 31,
        }}
        aria-label="table"
      >
        <TableHead>
          {/* <div>Item Count {rowCount}</div> */}
          <TableRow>
            <TableCell>Item ID</TableCell>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">OwnerID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.item}</TableCell>
              <TableCell align="center">{row.desciption}</TableCell>
              <TableCell align="center">{row.owner_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
