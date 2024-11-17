import { createContext, useState } from "react";

export const ViewContext = createContext();

export default function ViewContextProvider(props) {
  const [view, setView] = useState(0);
  const [move, setMove] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  function handleViewChange(newView) {
    setView(newView);
    setMove(0);
    console.log(newView);
  }

  function handleMoveChange(newMove) {
    setMove(newMove);
    setMoveCount((prev) => prev + 1);
    console.log(newMove);
  }

  var contextValue = {
    handleViewChange,
    handleMoveChange,
    view,
    setView,
    move,
    moveCount,
  };

  return (
    <ViewContext.Provider value={contextValue}>
      {props.children}
    </ViewContext.Provider>
  );
}
