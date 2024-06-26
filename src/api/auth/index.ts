import { CommonResponseType } from "@/interface/api/commonType";
import { postApi } from "..";

export const authApi = {
    login: async (data: { loginId: string; password: string }) => {
        return await postApi('/auth/login', data);
    }
}
