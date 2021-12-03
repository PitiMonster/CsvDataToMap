import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import classes from "./index.module.scss";

import { Context as CsvDataContext } from "../../../../../../context/CsvDataContext";

const ChooseOrderOfData = () => {
  const { state, setTypesOrder } = React.useContext(CsvDataContext);

  const [dataTypes, setDataTypes] = React.useState(state.typesOrder);

  const handleOnDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) return;

      const items = Array.from(dataTypes);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setDataTypes(items);
      setTypesOrder(items);
    },
    [dataTypes]
  );

  return React.useMemo(
    () => (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dataTypes">
          {(provided) => (
            <ul
              className={classes.typesList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dataTypes.map((type, index) => {
                return (
                  <Draggable key={type} draggableId={type} index={index}>
                    {(provided) => (
                      <li
                        className={classes.listItem}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {type}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    ),
    [dataTypes, handleOnDragEnd]
  );
};

export default ChooseOrderOfData;
