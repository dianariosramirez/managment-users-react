import { FilterVariables, UserCompleteData } from "../types";
import { users } from "./database";

const API_KEY_LOCAL_STORAGE = "users-table-data";

const usersTable =
  typeof window !== "undefined" && localStorage.getItem(API_KEY_LOCAL_STORAGE)
    ? JSON.parse(localStorage.getItem(API_KEY_LOCAL_STORAGE)!)
    : users;

export class API {
  static GetUsers = (variables: FilterVariables): UserCompleteData[] => {
    const { search, email, name, role, status, pageSize, pageIndex, sortBy } =
      variables;

    const filteredUsers = usersTable.filter((user: UserCompleteData) => {
      if (
        search &&
        (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()))
      )
        return true;
      if (email && user.email.toLowerCase().includes(email.toLowerCase()))
        return true;
      if (name && user.firstName.toLowerCase().includes(name.toLowerCase()))
        return true;
      if (role && user.role.toLowerCase().includes(role.toLowerCase()))
        return true;
      if (status && user.status.toLowerCase().includes(status.toLowerCase()))
        return true;
      if (!search && !email && !name && !role && !status) return true;
      return false;
    });

    const { column, order } = sortBy;

    const sortedUsers = (filteredUsers as UserCompleteData[]).toSorted(
      (userA, userB) => {
        const valueA =
          column === "name"
            ? userA.firstName
            : userA[column as keyof UserCompleteData];
        const valueB =
          column === "name"
            ? userB.firstName
            : userB[column as keyof UserCompleteData];

        if (column === "name") {
          console.log({ valueA, valueB });
        }
        console.log({ valueA, valueB });
        if (order === "asc")
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    );

    console.log("sorttr", sortedUsers);
    const offset = pageIndex * pageSize;
    return sortedUsers.slice(offset, offset + pageSize);
  };

  static CountTotalUsers = (): number => {
    return usersTable.length;
  };

  static AddUser = (newUser: UserCompleteData) => {
    usersTable.push(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_LOCAL_STORAGE, JSON.stringify(usersTable));
    }
  };

  static UpdateUser = (updatedUser: UserCompleteData) => {
    const index = usersTable.findIndex(
      (user: UserCompleteData) => user.id === updatedUser.id
    );
    usersTable[index] = updatedUser;
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_LOCAL_STORAGE, JSON.stringify(usersTable));
    }
  };

  static DeleteUser = (userId: string) => {
    const index = usersTable.findIndex(
      (user: UserCompleteData) => user.id === userId
    );
    usersTable.splice(index, 1);
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_LOCAL_STORAGE, JSON.stringify(usersTable));
    }
  };
}
