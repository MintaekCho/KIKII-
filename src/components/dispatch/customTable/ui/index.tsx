import React, { memo, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { INIT_DISPATCH_STATE, dispatchState } from '@/atom/dispatchStore';
import { DispatchType } from '@/pages/dispatchPage';

type CustomTableProps = {
    dispatchData: DispatchType[][];
};

function CustomTable({ dispatchData }: CustomTableProps) {
    const [data, setData] = useState<DispatchType[][]>([]);
    const [selectedDispatch, setSelectedDispatch] = useRecoilState(dispatchState);
    const [maxTimeLength, setMaxTimeLength] = useState(0);

    const TABLE_HEADER_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 bg-[#E2E5ED] px-2 py-5 text-gray-700 border-l border-t border-b border-black text-center';
    const TABLE_CELL_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 px-2 py-4 text-gray-700 text-center border-l border-b border-black';

    // dispatchData 중 가장 많은 버스의 시간표 길이를 반환
    const getMaxTimeLength = () => {
        return Math.max(...dispatchData.map((item) => item.length));
    };
    // TODO: 순번 재적용 필요
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
    };

    const handleSelectTimeCell = (dispatchData: any, id: string, index: number) => {
        console.log(dispatchData);
        if (
            selectedDispatch.selectedTimeCellPostion[0] === id &&
            selectedDispatch.selectedTimeCellPostion[1] === index
        ) {
            setSelectedDispatch(INIT_DISPATCH_STATE);
            return;
        }
        setSelectedDispatch((prev) => ({
            ...prev,
            isSelected: true,
            selectedDispatch: dispatchData,
            selectedTimeCellPostion: [id, index],
        }));
    };

    useEffect(() => {
        setMaxTimeLength(getMaxTimeLength());

        return () => {
            setSelectedDispatch(INIT_DISPATCH_STATE);
        }
    }, []);

    useEffect(() => {
        if (!dispatchData) return;
        setData(dispatchData);
    }, [dispatchData])

    return (
        <div className="w-full max-w-[1280px] min-h-[500px] overflow-hidden overflow-x-auto border border-black">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="table" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="w-full table">
                            <div className="w-full flex font-bold">
                                <div className={`${TABLE_HEADER_STYLE}`}>순번</div>
                                <div className={`${TABLE_HEADER_STYLE}`}>차량번호</div>
                                <div className={`${TABLE_HEADER_STYLE}`}>성명</div>
                                {[...Array(18)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${TABLE_HEADER_STYLE} ${index === maxTimeLength - 1 && 'border-r'}`}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className=" ">
                                {data.map((item, index) => (
                                    <Draggable key={`row-${index}`} draggableId={`row-${index}`} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className={`flex ${snapshot.isDragging && 'bg-[#f3f3f5] max-w-[1280px] overflow-hidden'} font-bold hover:bg-[#f3f3f5] group-hover:bg-[#f3f3f5]`}
                                            >
                                                <div className={`${TABLE_CELL_STYLE} bg-[#E2E5ED] group`}>
                                                    {item[index].startOrder + 1}
                                                </div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{item[index].busId}</div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{item[index].driverName}</div>
                                                {item.map((info, i) => {
                                                    const isSelect =
                                                        selectedDispatch &&
                                                        selectedDispatch.selectedTimeCellPostion[0] ===
                                                            info.driverName &&
                                                        selectedDispatch.selectedTimeCellPostion[1] === i;
                                                    return (
                                                        <div
                                                            key={i}
                                                            onClick={() =>
                                                                handleSelectTimeCell(info, info.driverName, i)
                                                            }
                                                            className={`cursor-pointer ${TABLE_CELL_STYLE} ${isSelect && 'bg-[#C7CCFF]'}  ${item.length - 1 === i && 'border-r'} border-black duration-300`}
                                                        >
                                                            {info.startTime}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default memo(CustomTable);