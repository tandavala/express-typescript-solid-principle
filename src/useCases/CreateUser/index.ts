import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUserFakeRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserCase(
    postgresUsersRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }