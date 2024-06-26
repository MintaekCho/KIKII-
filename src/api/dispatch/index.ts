import { getApi, patchApi } from '..';

export const dispatchApi = {
    getDispatchList: async (routeId: number, date: string) => {
        return await getApi(`/dispatch/${routeId}/${date}`);
    },
    updateDispatch: async (dispatchId: number, time: string) => {
        return await patchApi(`/dispatch/update/${dispatchId}/${time}`, {});
    },
};
