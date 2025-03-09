import UserRepository from "../UserRepository";

export default class GetSingleUser {
    constructor(private userRepo : UserRepository) {}

    async call(id : number) {
        return await this.userRepo.getUser(id)
    }
}