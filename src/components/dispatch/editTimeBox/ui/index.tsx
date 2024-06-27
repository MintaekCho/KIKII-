import { INIT_DISPATCH_STATE, dispatchState } from '@/atom/dispatchStore';
import { CSSTransition } from 'react-transition-group';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { dispatchApi } from '@/api/dispatch';

export default function EditTimeBox({ refetch }: { refetch: () => void }) {
    const INIT_EDIT_TIME = {
        hour: '',
        sec: '',
    };
    const [editTime, setEditTime] = useState(INIT_EDIT_TIME);
    const [selectedDispatch, setSelectedDispatch] = useRecoilState(dispatchState);

    // TODO: 타입지정
    const { id, driverName, busRound, startTime }: any = selectedDispatch.selectedDispatch;

    const handleCancel = () => {
        setSelectedDispatch(INIT_DISPATCH_STATE);
        setEditTime(INIT_EDIT_TIME);
    };

    const handleUpdateTime = async () => {
        if (editTime.hour === '' || editTime.sec === '') {
            alert('수정 시간을 입력해주세요.');
            return;
        }
        const res = await dispatchApi.updateDispatch(id, `${editTime.hour}:${editTime.sec}`);
        console.log(res);
        if (res.status === 200) {
            refetch();
        }
        // 다른 에러 스테이터스에 관한 예외처리 필요
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hour' | 'sec') => {
        const { name, value } = e.target;
        if (!/^[0-9]*$/.test(value)) {
            alert('숫자만 입력 가능합니다.');
            return;
        }
        const numValue = Number(value);
        if (value.length > 2) return;
        if (type === 'hour') {
            if (numValue > 23) {
                alert('24시 이후로는 입력할 수 없습니다.');
                return;
            }
            if (numValue < 0) {
                alert('0시 이전으로는 입력할 수 없습니다.');
                return;
            }
        }
        if (type === 'sec') {
            if (numValue > 59) {
                alert('59분 이후로는 입력할 수 없습니다.');
                return;
            }
            if (numValue < 0) {
                alert('0분 이전으로는 입력할 수 없습니다.');
                return;
            }
        }
        setEditTime((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 다른 timeCell 선택 시 수정 시간 초기화
    useEffect(() => {
        setEditTime(INIT_EDIT_TIME);
    }, [selectedDispatch]);

    return (
        <>
            <CSSTransition classNames="fade" timeout={300} in={selectedDispatch.isSelected} unmountOnExit>
                <section
                    className={`w-[500px] h-screen p-10 flex flex-col items-center  bg-[#EBECFC] border border-[#707070] ${selectedDispatch.isSelected ? 'black' : 'hidden'}`}
                >
                    <h1 className="text-3xl font-bold">시간 수정</h1>
                    <div className="w-full flex flex-col gap-2 mt-20">
                        <h2 className="text-[18px] text-[#19289A]">A.변경할 시간</h2>
                        <p className="text-[14px]">
                            <b>변경할 시간</b>을 선택(클릭)해주세요.
                        </p>
                        <div className="w-full h-[50px] bg-white grid place-items-center">
                            <p className="text-[18px]">
                                {driverName} - {busRound + 1} 회차 / {startTime}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-8">
                        <h2 className="text-[18px] text-[#19289A]">B.수정 시간 입력</h2>
                        <p>수정할 시간을 입력해주세요.</p>
                        <div className="w-full h-[60px] flex gap-5 items-center">
                            <input
                                type="text"
                                name="hour"
                                value={editTime.hour}
                                onChange={(e) => handleTimeChange(e, 'hour')}
                                className="w-1/2 h-[50px] bg-white outline-none text-center text-[18px]"
                            />
                            <span className="text-5xl text-[#BCBCBC] relative bottom-1">:</span>
                            <input
                                type="text"
                                name="sec"
                                value={editTime.sec}
                                onChange={(e) => handleTimeChange(e, 'sec')}
                                className="w-1/2 h-[50px] bg-white outline-none text-center text-[18px]"
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center gap-10 mt-16">
                        <button
                            className="px-10 py-3 text-lg rounded-[24px] bg-[#898989] text-[#E2E2E2] font-semibold"
                            onClick={handleCancel}
                        >
                            취소
                        </button>
                        <button
                            className="px-10 py-3 text-lg rounded-[24px] bg-[#19289A] text-white font-semibold"
                            onClick={handleUpdateTime}
                        >
                            변경
                        </button>
                    </div>
                </section>
            </CSSTransition>
        </>
    );
}
