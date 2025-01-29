"use client";

import React, { useEffect, useState } from "react";
import {
  Column,
  Filters,
  FilterVariables,
  SortBy,
  UserCompleteData,
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
import { ModalUserForm } from "./ModalUserForm";
import { set } from "react-hook-form";
import useAppStore from "@/lib/store/useAppStore";

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
  const [usersList, setUsersList] = useState<UserCompleteData[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCompleteData | null>(
    null
  );

  const { setSnackbarProps } = useAppStore();

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
          sortBy: sortBy,
        };

        const [usersData, totalUsers] = await Promise.all([
          UserService.GetUsersData(variables),
          UserService.CountTotalUsers(),
        ]);

        setUsersList(usersData);
        setTotalUsers(totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery, filters, rowsPerPage, pageIndex, sortBy]);

  const refreshTable = async () => {
    const newUsers = await UserService.GetUsersData({
      search: searchQuery,
      role: filters.role,
      status: filters.status,
      pageSize: rowsPerPage,
      pageIndex: pageIndex,
      sortBy: sortBy,
    });

    const totalUsersRefresh = await UserService.CountTotalUsers();
    setUsersList(newUsers);
    setTotalUsers(totalUsersRefresh);
  };

  const handleEditUser = (user: UserCompleteData) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleDeleteUser = async (id: string) => {
    await UserService.DeleteUser(id);
    setSnackbarProps({
      open: true,
      message: "User deleted successfully",
      severity: "success",
    });
    refreshTable();
  };

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
                  <TableCell> {`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell> {row.email}</TableCell>
                  <TableCell> {row.phoneNumber}</TableCell>
                  <TableCell> {row.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Active" ? "secondary" : "primary"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ ":hover": { color: "primary.main" } }}
                      onClick={() => handleEditUser(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ ":hover": { color: "error.main" } }}
                      onClick={() => handleDeleteUser(row.id)}
                    >
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
      <ModalUserForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userData={selectedUser}
        type="edit"
        refreshTable={refreshTable}
      />
    </Box>
  );
};
