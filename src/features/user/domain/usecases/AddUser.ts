import UserType from "../UserEntity";
import UserRepository from "../UserRepository";

export default class AddUser {
    constructor(private userRepo : UserRepository) {}

    call(user : UserType) {
        this.userRepo.addUser(user)
    }
}