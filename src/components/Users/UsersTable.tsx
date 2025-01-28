"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Column, Filters, SortBy, UserData } from "@/lib/types";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { users } from "@/lib/api/database";
import { TableActions } from "./TableActions";
import { Delete, Edit } from "@mui/icons-material";

const columns: Column[] = [
  { id: "name", label: "Name", width: "30%", align: "left" },
  { id: "email", label: "Email", width: "20%", align: "left" },
  { id: "phoneNumber", label: "Phone number", width: "15%", align: "left" },
  { id: "role", label: "User role", width: "10%", align: "left" },
  { id: "status", label: "Status", width: "10%", align: "left" },
  { id: "actions", label: "Actions", width: "15%", align: "left" },
];

export const UsersTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ role: "", status: "" });
  const [sortBy, setSortBy] = useState<SortBy>({ column: null, order: "asc" });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  const filteredAndSortedUsers = users
    .filter(
      (user) =>
        (!filters.role || user.role === filters.role) &&
        (!filters.status || user.status === filters.status) &&
        (user.name.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (!sortBy.column || !(sortBy.column in a)) return 0;
      const valueA = a[sortBy.column as keyof UserData];
      const valueB = b[sortBy.column as keyof UserData];
      if (sortBy.order === "asc") return valueA > valueB ? 1 : -1;
      return valueA < valueB ? 1 : -1;
    });

  const visibleUsers = filteredAndSortedUsers.slice(
    pageIndex * rowsPerPage,
    pageIndex * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        mt: 4,
      }}
    >
      <TableActions
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        columns={columns}
        setSearchQuery={setSearchQuery}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Users table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                  scope="col"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!visibleUsers.length ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleUsers.map((row) => (
                <TableRow hover key={row.email}>
                  <TableCell> {row.name}</TableCell>
                  <TableCell> {row.email}</TableCell>
                  <TableCell> {row.phoneNumber}</TableCell>
                  <TableCell> {row.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Active" ? "primary" : "secondary"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ ":hover": { color: "primary.main" } }}>
                      <Edit />
                    </IconButton>
                    <IconButton sx={{ ":hover": { color: "error.main" } }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredAndSortedUsers.length}
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
