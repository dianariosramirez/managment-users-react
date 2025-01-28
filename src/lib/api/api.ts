import { FilterVariables, UserData } from "../types";
import { users } from "./database";

const API_KEY_LOCAL_STORAGE = "users-table-data";

const usersTable =
  typeof window !== "undefined" && localStorage.getItem(API_KEY_LOCAL_STORAGE)
    ? JSON.parse(localStorage.getItem(API_KEY_LOCAL_STORAGE)!)
    : users;

export class API {
  static GetUsers = (variables: FilterVariables): UserData[] => {
    const { search, email, name, role, status, pageSize, pageIndex } =
      variables;

    const filteredUsers = usersTable.filter((user: UserData) => {
      if (search && user.name.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (email && user.email.toLowerCase().includes(email.toLowerCase()))
        return true;
      if (name && user.name.toLowerCase().includes(name.toLowerCase()))
        return true;
      if (role && user.role.toLowerCase().includes(role.toLowerCase()))
        return true;
      if (status && user.status.toLowerCase().includes(status.toLowerCase()))
        return true;
      if (!search && !email && !name && !role && !status) return true;
      return false;
    });

    const offset = pageIndex * pageSize;
    return filteredUsers.slice(offset, offset + pageSize);
  };

  static CountTotalUsers = (): number => {
    return usersTable.length;
  };

  static AddUser = (newUser: UserData) => {
    usersTable.push(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_LOCAL_STORAGE, JSON.stringify(usersTable));
    }
  };
}
