import React, { useEffect, useState } from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/ic_leftArrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/ic_rightArrow.svg';
import CustomTable from '@/components/dispatch/customTable/ui';
import { dispatchApi } from '@/api/dispatch';
import { timeUtils } from '@/utils/timeUtil';
import EditTimeBox from '@/components/dispatch/editTimeBox/ui';
import { useQuery } from '@tanstack/react-query';

export interface DispatchType {
    id: number;
    startOrder: number;
    routeName: string;
    driverName: string;
    driverId: number;
    busId: number;
    busNumber: string;
    busType: string;
    startTime: string;
    unixStartTime: number | null;
    busRound: number;
}

export default function DispatchPage() {
    const [dispatchData, setDispatchData] = useState<DispatchType[][]>([]);
    const [currentDate, setCurrentDate] = useState<string>(timeUtils.timeFormat('2024-05-20'));

    const handleDateChange = (type: 'up' | 'down') => {
        if (type === 'up') {
            if (currentDate === timeUtils.timeFormat('2024-05-23')) {
                return alert('2024년 5월 23일 이전으로 조회할 수 있습니다.');
            }
            setCurrentDate(timeUtils.addDate(currentDate));
        } else {
            if (currentDate === timeUtils.timeFormat('2024-05-20')) {
                return alert('2024년 5월 20일 이후로 조회할 수 있습니다.');
            }
            setCurrentDate(timeUtils.subtractDate(currentDate));
        }
    };

    function groupByDriverId(schedules: DispatchType[]): DispatchType[][] {
        // 드라이버 ID별로 그룹화할 객체 생성
        const grouped: { [key: number]: DispatchType[] } = {};

        // 배열을 순회하면서 그룹화
        schedules.forEach((schedule) => {
            const driverId = schedule.driverId;
            if (!grouped[driverId]) {
                grouped[driverId] = [];
            }
            grouped[driverId].push(schedule);
        });

        // 그룹화된 객체를 2차원 배열로 변환
        return Object.values(grouped).sort((a, b) => a[0].startOrder - b[0].startOrder);
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['dispatchList', currentDate],
        queryFn: () => dispatchApi.getDispatchList(70, currentDate),
        staleTime: 1000 * 60 * 1,
    });

    useEffect(() => {
        if (!data) return;
        setDispatchData(groupByDriverId(data.object));
    }, [data]);

    return (
        <div className={`w-full h-full flex`}>
            <div className={`w-full h-full flex flex-col items-center relative overflow-hidden`}>
                <div className="w-full flex items-center justify-center mt-10 gap-40">
                    <div className="cursor-pointer" onClick={() => handleDateChange('down')}>
                        <LeftArrow />
                    </div>
                    <p className="text-2xl font-bold">{currentDate} (금)</p>
                    <div className="cursor-pointer" onClick={() => handleDateChange('up')}>
                        <RightArrow />
                    </div>
                </div>
                <section className="w-full max-w-[960px] p-4 mt-10">
                    <div className="flex flex-col justify-start gap-4">
                        <h1 className="text-[18px] font-bold">시간 및 차량, 성명란을 눌러 수정하세요</h1>
                        <CustomTable dispatchData={dispatchData} />
                    </div>
                </section>
            </div>
            <EditTimeBox refetch={refetch} />
        </div>
    );
}
