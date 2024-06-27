import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { INIT_DATA } from '../constant';
import { useRecoilState } from 'recoil';
import { dispatchState } from '@/atom/dispatchStore';

export default function CustomTable() {
    const [data, setData] = useState(INIT_DATA);
    const [selectedDispatch, setSelectedDispatch] = useRecoilState(dispatchState);

    const TABLE_HEADER_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 bg-[#E2E5ED] px-2 py-5 text-gray-700 border-l border-t border-b border-black text-center';
    const TABLE_CELL_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 px-2 py-4 text-gray-700 text-center border-l border-b border-black';

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
    };

    const handleSelectTimeCell = (dispatchData: any, x: number, y: number) => {
        setSelectedDispatch((prev) => ({
            ...prev,
            selectedDispatch: dispatchData,
            selectedTimeCellPostion: [x, y],
        }));
    };

    console.log(selectedDispatch);

    return (
        <div className="w-full">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="table" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="w-full table">
                            <div className="w-full flex font-bold">
                                <div className={`${TABLE_HEADER_STYLE}`}>순번</div>
                                <div className={`${TABLE_HEADER_STYLE}`}>차량번호</div>
                                <div className={`${TABLE_HEADER_STYLE}`}>성명</div>
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className={`${TABLE_HEADER_STYLE} ${index === 7 && 'border-r'}`}>
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className=" ">
                                {data.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className={`flex ${snapshot.isDragging && 'bg-[#f3f3f5]'} font-bold hover:bg-[#f3f3f5] group-hover:bg-[#f3f3f5]`}
                                            >
                                                <div className={`${TABLE_CELL_STYLE} bg-[#E2E5ED] group`}>
                                                    {item.id}
                                                </div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{item.carNumber}</div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{item.name}</div>
                                                {item.times.map((time, i) => {
                                                    const isSelect =
                                                        selectedDispatch &&
                                                        selectedDispatch.selectedTimeCellPostion[0] === index &&
                                                        selectedDispatch.selectedTimeCellPostion[1] === i;
                                                    return (
                                                        <div
                                                            key={i}
                                                            onClick={() => handleSelectTimeCell(item, index, i)}
                                                            className={`cursor-pointer ${TABLE_CELL_STYLE} ${isSelect && 'bg-[#C7CCFF]'}  ${item.times.length - 1 === i && 'border-r'} border-black duration-300`}
                                                        >
                                                            {time}
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
