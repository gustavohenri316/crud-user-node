import { Router } from "express";

import { CreateUserController } from "../controllers/User/create-user/create-user";
import { DeleteUserController } from "../controllers/User/delete-user/delete-user";
import { GetUsersController } from "../controllers/User/get-users/get-users";
import { UpdateUserController } from "../controllers/User/update-user/update-user";
import { MongoCreateUserRepository } from "../repositories/Users/create-user/mongo-create-user";
import { MongoDeleteUserRepository } from "../repositories/Users/delete-user/mongo-delete-user";
import { MongoGetUsersRepository } from "../repositories/Users/get-users/mongo-get-users";
import { MongoUpdateUserRepository } from "../repositories/Users/update-user/mongo-update-user";

const router = Router();

router.get("/", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  const { body, statusCode } = await getUsersController.handle();
  res.status(statusCode).send(body);
});

router.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );
  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

router.patch("/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    params: req.params,
    body: req.body,
  });

  res.status(statusCode).send(body);
});
router.delete("/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );
  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });
  res.status(statusCode).send(body);
});

export default router;
