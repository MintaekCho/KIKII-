import React, { useEffect, useState } from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/ic_leftArrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/ic_rightArrow.svg';
import CustomTable from '@/components/customTable/ui';
import { dispatchApi } from '@/api/dispatch';

export default function DispatchPage() {

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const getDispatchList = async () => {
            const res = await dispatchApi.getDispatchList(70, '2024-05-23');
            setData(res.object);
        }
        getDispatchList();

        // busId가 동일한 데이터끼리 배열로 묶어서 시간순으로 정렬
        // busRound 최댓값으로 표생성

    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex items-center justify-center mt-10 gap-40">
                <div className="cursor-pointer">
                    <LeftArrow />
                </div>
                <p className="text-2xl font-bold">2024-05-23 (금)</p>
                <div className="cursor-pointer">
                    <RightArrow />
                </div>
            </div>
            <section className="w-full max-w-[960px] p-4 mt-10">
                <div className='flex flex-col justify-start gap-4'>
                    <h1 className="text-[18px] font-bold">시간 및 차량, 성명란을 눌러 수정하세요</h1>
                    <CustomTable />
                </div>
            </section>
        </div>
    );
}
