import { createContext, useContext, useState } from "react";

type initCtx = {
  model?: string
  setModel: React.Dispatch<React.SetStateAction<string>>
  sidebar?: boolean,
  setSidebar?: any
}


export const AppContext = createContext<any>({});

export const AppContextProvider = ({ children }: any) => {
  const [model, setModel] = useState<string>('text-davinci-001')
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>();

  const setMode = (mode: string) => {

    setIsDark(mode !== "Light");
    // console.log(mode)
    localStorage.setItem("themeMode", mode);
  };

  return (
    <AppContext.Provider value={{ model, setModel, sidebar, setSidebar, isDark, setMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
