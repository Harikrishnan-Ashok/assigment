import { createContext, useState } from "react";
export const ViewContext = createContext();

export default function ViewContextProvider(props) {
  const [view, setView] = useState(0);

  function handleViewChange(event, newView) {
    console.log(view);
    setView(newView);
  }

  var contextValue = { handleViewChange, view, setView };
  return (
    <ViewContext.Provider value={contextValue}>
      {props.children}
    </ViewContext.Provider>
  );
}
