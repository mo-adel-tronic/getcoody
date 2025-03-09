import UserType from "../UserEntity";
import UserRepository from "../UserRepository";

export default class UpdateUser {
    constructor(private userRepo : UserRepository) {}

    call(user : UserType) {
        this.userRepo.updateUser(user)
    }
}