import { createContext, useContext, useState } from "react";

type initCtx = {
  model?: string
  setModel: React.Dispatch<React.SetStateAction<string>>
  sidebar?: boolean,
  setSidebar?: any
}


export const AppContext = createContext<any>({});

export const AppContextProvider = ({ children }: any) => {
  const [model, setModel] = useState<string>('text-davinci-003')
  const [sidebar, setSidebar] = useState<boolean>(false)
  return (
    <AppContext.Provider value={{ model, setModel, sidebar, setSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
