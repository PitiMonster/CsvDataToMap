import React, { useReducer } from "react";

const createDataContext = (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const dumpedActions = {};
    for (let key in actions) {
      dumpedActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...dumpedActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
