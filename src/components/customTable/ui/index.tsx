import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { INIT_DATA } from '../constant';

export default function CustomTable() {
    const [data, setData] = useState(INIT_DATA);

    const TABLE_HEADER_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 bg-[#E2E5ED] px-2 py-5 text-gray-700 border-l border-t border-b border-black text-center';
    const TABLE_CELL_STYLE =
        'min-w-[80px] max-w-[120px] flex-1 px-2 py-4 text-gray-700 text-center border-l border-b border-black';

    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
    };

    return (
        <div className="w-full ">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="table" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="w-full table">
                            <div className="w-full flex">
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
                                {data.map(({ id, carNumber, name, times }, index) => (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className={`flex ${snapshot.isDragging && 'bg-gray-100'}`}
                                            >
                                                <div className={`${TABLE_CELL_STYLE} bg-[#E2E5ED]`}>{index + 1}</div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{carNumber}</div>
                                                <div className={`${TABLE_CELL_STYLE}`}>{name}</div>
                                                {times.map((time, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => console.log(index, i)}
                                                        className={`cursor-pointer ${TABLE_CELL_STYLE}  ${times.length - 1 === i && 'border-r'} border-black`}
                                                    >
                                                        {time}
                                                    </div>
                                                ))}
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
