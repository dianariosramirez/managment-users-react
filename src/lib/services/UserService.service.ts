import { API } from "../api/api";
import { FilterVariables, UserCompleteData } from "../types";

export class UserService {
  static GetUsersData = (
    variables: FilterVariables
  ): Promise<UserCompleteData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.GetUsers(variables);
        console.log("result-->", result);
        resolve(result);
      }, 500);
    });
  };

  static CountTotalUsers = (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.CountTotalUsers();
        resolve(result);
      }, 500);
    });
  };

  static AddNewUser = (newUserData: UserCompleteData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.AddUser(newUserData);
        resolve(result);
      }, 500);
    });
  };

  static UpdateUser = (updatedUserData: UserCompleteData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = API.UpdateUser(updatedUserData);
        resolve(result);
      }, 500);
    });
  };

  static DeleteUser = (userId: string) => {
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
      throw new Error("Error upload image");
    }
  };
}
