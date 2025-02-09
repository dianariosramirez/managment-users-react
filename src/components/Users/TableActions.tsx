import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Popover,
  TextField,
} from "@mui/material";
import {
  FilterList,
  LowPriority,
  Search,
  ArrowUpward,
  ArrowDownward,
  PersonAddAlt,
} from "@mui/icons-material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Column, Filters, SortBy } from "@/lib/types";
import { ModalUserForm } from "./ModalUserForm";

interface TableActionsProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  columns: Column[];
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  sortBy: SortBy;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

// Table actions component to filter, sort, and search users

export const TableActions = ({
  filters,
  setFilters,
  columns,
  setSortBy,
  sortBy,
  setSearchQuery,
}: TableActionsProps) => {
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleOpenSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleCloseSort = () => {
    setSortAnchorEl(null);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search by Name or Email"
        onChange={handleSearch}
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        sx={{ width: "70%" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          pl: 2,
          width: "30%",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleOpenFilter}
          startIcon={<FilterList />}
        >
          Filter
        </Button>
        <Popover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2, minWidth: 300 }}>
            <TextField
              select
              label="Role"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </Popover>

        <Button
          variant="outlined"
          onClick={handleOpenSort}
          startIcon={<LowPriority />}
        >
          Sort
        </Button>
        <Popover
          open={Boolean(sortAnchorEl)}
          anchorEl={sortAnchorEl}
          onClose={handleCloseSort}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box
            sx={{
              p: 2,
              minWidth: 200,
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            {columns
              .filter((column) => column.id !== "actions")
              .map((column) => (
                <Button
                  key={column.id}
                  onClick={() =>
                    setSortBy({
                      column: column.id,
                      order: sortBy.order === "asc" ? "desc" : "asc",
                    })
                  }
                  startIcon={
                    sortBy.column === column.id ? (
                      sortBy.order === "asc" ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )
                    ) : null
                  }
                >
                  {column.label}
                </Button>
              ))}
          </Box>
        </Popover>
        <Button
          variant="contained"
          onClick={handleAddUser}
          startIcon={<PersonAddAlt />}
        >
          Add User
        </Button>
        <ModalUserForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userData={null}
          type="add"
        />
      </Box>
    </Box>
  );
};
