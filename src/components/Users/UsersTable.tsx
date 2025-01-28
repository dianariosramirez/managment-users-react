"use client";

import React, { useEffect, useState } from "react";
import {
  Column,
  Filters,
  FilterVariables,
  SortBy,
  UserData,
} from "@/lib/types";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { TableActions } from "./TableActions";
import { Delete, Edit } from "@mui/icons-material";
import { UserService } from "@/lib/services/UserService.service";

const columns: Column[] = [
  { id: "name", label: "Name", width: "30%", align: "left" },
  { id: "email", label: "Email", width: "20%", align: "left" },
  { id: "phoneNumber", label: "Phone number", width: "15%", align: "left" },
  { id: "role", label: "User role", width: "10%", align: "left" },
  { id: "status", label: "Status", width: "10%", align: "left" },
  { id: "actions", label: "Actions", width: "15%", align: "left" },
];

export const UsersTable = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ role: "", status: "" });
  const [sortBy, setSortBy] = useState<SortBy>({ column: null, order: "asc" });
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const variables: FilterVariables = {
          search: searchQuery,
          role: filters.role,
          status: filters.status,
          pageSize: rowsPerPage,
          pageIndex: pageIndex,
        };

        const [usersData, totalUsers] = await Promise.all([
          UserService.GetUsersData(variables),
          UserService.CountTotalUsers(),
        ]);

        const sortedUsers = (usersData as UserData[]).sort((a, b) => {
          if (!sortBy.column || !(sortBy.column in a)) return 0;
          const valueA = a[sortBy.column as keyof UserData];
          const valueB = b[sortBy.column as keyof UserData];
          if (sortBy.order === "asc") return valueA > valueB ? 1 : -1;
          return valueA < valueB ? 1 : -1;
        });

        setUsersList(sortedUsers);
        setTotalUsers(totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery, filters, rowsPerPage, pageIndex]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
      <TableContainer sx={{ maxHeight: 440, flexGrow: 1 }}>
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
            {dataLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !usersList.length ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              usersList.map((row) => (
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
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
