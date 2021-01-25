import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserCase {
    //private usersRepository: IUsersRepository;
    constructor(
       private usersRepository: IUsersRepository,
       private mailProvider: IMailProvider
    ){   }
    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
        if(userAlreadyExists){
            throw new Error('User already exists.');
        }
        const user = new User(data);
        await this.usersRepository.save(user);

       await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipa do meu App',
                email: 'equipa@meuapp.com'
            },
            subject: 'Seja bem vindo ao nosso app',
            body: '<p>Podes agora fazer login no app</p>'
        });
    }
}