import { atom } from "recoil";

interface DispatchStateType {
    selectedTimeCellPostion: [number, number] | [],
    selectedDispatch: object,
}

export const INIT_DISPATCH_STATE: DispatchStateType = {
    selectedTimeCellPostion: [],
    selectedDispatch: {}, 
}

export const dispatchState = atom<DispatchStateType>({
    key: 'dispatchState',
    default: INIT_DISPATCH_STATE,
})