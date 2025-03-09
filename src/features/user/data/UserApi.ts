import { ApiRouteName } from "core/utils/constants";
import { ApiService } from "core/utils/ApiService";

export default class UserApi {
    async getUser(id: number) {
        const d = await ApiService.fetchRequest(
            `${ApiRouteName.user}/${id}`
        )
        return d
    }
}