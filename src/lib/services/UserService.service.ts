import { API } from "../api/api";
import { FilterVariables, UserCompleteData } from "../types";

export class UserService {
  static GetUsersData = (
    variables: FilterVariables
  ): Promise<UserCompleteData[]> => {
    console.log("service: Fetching user data...");

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.GetUsers(variables);
        console.log("result-->", result);
        resolve(result);
      }, 500);
    });
  };

  static CountTotalUsers = (): Promise<number> => {
    console.log("service: Counting total users...");

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.CountTotalUsers();
        resolve(result);
      }, 500);
    });
  };

  static AddNewUser = (newUserData: UserCompleteData) => {
    console.log("service: Adding new user...");

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.AddUser(newUserData);
        resolve(result);
      }, 500);
    });
  };

  static UpdateUser = (updatedUserData: UserCompleteData) => {
    console.log("service: Updating user...");

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.UpdateUser(updatedUserData);
        resolve(result);
      }, 500);
    });
  };

  static DeleteUser = (userId: string) => {
    console.log("service: Deleting user...");

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.DeleteUser(userId);
        resolve(result);
      }, 500);
    });
  };

  static UploadUserPhoto = async (
    file: File,
    firstName: string,
    lastName: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", `${firstName}-${lastName}`);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=490e5f7d56bcc9f0919a001d4400b073`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Error al subir la imagen");
    }
  };
}
