import { FilterVariables, UserData } from "../types";
import { users } from "./database";

const API_KEY_LOCAL_STORAGE = "users-table-data";
const usersTable = localStorage.getItem(API_KEY_LOCAL_STORAGE)
  ? JSON.parse(localStorage.getItem(API_KEY_LOCAL_STORAGE)!)
  : users;

export class API {
  static GetUsers = (variables: FilterVariables) => {
    const { search, email, name, role, status, pageSize, pageIndex } =
      variables;

    console.log({ search, email, name, role, status, pageSize, pageIndex });
    const filteredUsers = usersTable.filter((user: UserData) => {
      if (search) {
        if (user.name.toLowerCase().includes(search)) return true;
      }
      if (email) {
        if (user.email.toLowerCase().includes(email)) return true;
      }
      if (name) {
        if (user.name.toLowerCase().includes(name)) return true;
      }
      if (role) {
        if (user.role.toLowerCase().includes(role)) return true;
      }
      if (status) {
        if (user.status.toLowerCase().includes(status)) return true;
      }
      if (!search && !email && !name && !role && !status) return true;
      return false;
    });

    console.log("-->", filteredUsers);
    const offset = pageIndex * pageSize;
    return filteredUsers.slice(offset, offset + pageSize);
  };

  static AddUser = (newUser: UserData) => {
    usersTable.push(newUser);
    localStorage.setItem(API_KEY_LOCAL_STORAGE, usersTable);
  };
}

// slice(
//   pageIndex * rowsPerPage,
//   pageIndex * rowsPerPage + rowsPerPage
// );
