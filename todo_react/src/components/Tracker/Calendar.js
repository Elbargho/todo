import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CalendarCell } from ".";

const currMonthCellStyle = {
  padding: "5px",
  border: "2px dashed var(--text-color)",
  color: "var(--text-color)",
  width: "CALC(100% / 7)"
};

const otherMonthCellStyle = {
  ...currMonthCellStyle,
  bgcolor: "var(--task-container-color)",
};

const currDayCellStyle = {
  ...currMonthCellStyle,
  bgcolor: "var(--highlight-color)",
};

export default function Calendar({ calendar, categories, selectedDate, setSelectedDate }) {
  const daysNames = ["Sun", "Mun", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderTableBody = () => {
    const currMonth = Object.keys(calendar)[7].split("-")[1];
    const tableRows = [];
    let tableCells = [];
    Object.entries(calendar).forEach(([date, statuses], i) => {
      const listsDetails = Object.entries(statuses).map(([key, value]) => {
        return { times_done: value, color: categories[key] };
      });
      const month = date.split("-")[1];
      const cellStyle =
        date == selectedDate ? currDayCellStyle : month == currMonth ? currMonthCellStyle : otherMonthCellStyle;
      tableCells.push(
        <TableCell key={date} sx={cellStyle}>
          <CalendarCell date={date} listsDetails={listsDetails} setSelectedDate={setSelectedDate} />
        </TableCell>
      );
      if ((i + 1) % 7 == 0) {
        tableRows.push(<TableRow sx={{ height: "CALC(100% / 7)" }} key={i}>{tableCells}</TableRow>);
        tableCells = [];
      }
    });
    return tableRows;
  };

  return (
    <TableContainer sx={{ borderRadius: "4px", height: "100%" }}>
      <Table sx={{ minWidth: 650, height: "100%" }}>
        <TableHead sx={{ bgcolor: "var(--text-color)", height: "20px" }}>
          <TableRow>
            {daysNames.map((dname) => (
              <TableCell key={dname} sx={{ padding: "0px", textAlign: "center" }}>
                {dname}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
}
