import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    const id = httpRequest?.params?.id;
    const body = httpRequest?.body;

    try {
      if (!id) {
        return {
          statusCode: 400,
          body: "Id is required",
        };
      }
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldsIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldsIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some fields are not allowed to update",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
