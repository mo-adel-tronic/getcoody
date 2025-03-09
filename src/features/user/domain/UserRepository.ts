import { AppResponse } from "core/utils/ApiService";
import UserType from "./UserEntity";

export default abstract class UserRepository {
    abstract addUser(user : UserType) : Promise<AppResponse>
    abstract updateUser(user : UserType) : Promise<AppResponse>
    abstract getUser(id : number) : Promise<AppResponse>
}