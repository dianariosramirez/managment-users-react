import { API } from "../api/api";
import { FilterVariables, UserData } from "../types";

export class UserService {
  static GetUsersData = (variables: FilterVariables) => {
    console.log("service");
    const result = API.GetUsers(variables);
    console.log("result-->", result);
    return result;
  };

  static AddNewUser = (newUserData: UserData) => {
    const result = API.AddUser(newUserData);
    return result;
  };
}
