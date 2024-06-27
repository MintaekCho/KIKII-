import { atom } from "recoil";

interface DispatchStateType {
    isSelected: boolean,
    selectedTimeCellPostion: [string, number] | [],
    selectedDispatch: object,
}

export const INIT_DISPATCH_STATE: DispatchStateType = {
    isSelected: false,
    selectedTimeCellPostion: [],
    selectedDispatch: {}, 
}

export const dispatchState = atom<DispatchStateType>({
    key: 'dispatchState',
    default: INIT_DISPATCH_STATE,
})