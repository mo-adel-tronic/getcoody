import { AppResponse } from "core/utils/ApiService";
import UserType from "../domain/UserEntity";
import UserRepository from "../domain/UserRepository";
import UserApi from "./UserApi";

export default class UserRepositoryImpl implements UserRepository {
    constructor(private userApi : UserApi){}
    updateUser(user: UserType): Promise<AppResponse> {
        throw new Error("Method not implemented.");
    }
    async getUser(id: number): Promise<AppResponse> {
        const data = await this.userApi.getUser(id)
        return data
    }
    addUser(user: UserType): Promise<AppResponse> {
        throw new Error("Method not implemented.");
    }
}