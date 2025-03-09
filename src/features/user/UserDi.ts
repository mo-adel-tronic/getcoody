import UserApi from "./data/UserApi";
import UserRepositoryImpl from "./data/UserRepositoryImpl";
import GetSingleUser from "./domain/usecases/GetSingleUser";

export const getSingleUser = new GetSingleUser(new UserRepositoryImpl(new UserApi()))