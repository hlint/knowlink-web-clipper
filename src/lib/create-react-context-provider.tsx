import { createContext, useContext } from "react";
import { type Updater, useImmer } from "use-immer";

export default function createReactContextProvider<T>(initialValue: T) {
  const ValueContext = createContext<T>(initialValue);
  const UpdaterContext = createContext<Updater<T>>(() => {});
  const Provider = ({ children }: { children: React.ReactNode }) => {
    const [value, updater] = useImmer<T>(initialValue);
    return (
      <ValueContext.Provider value={value}>
        <UpdaterContext.Provider value={updater}>
          {children}
        </UpdaterContext.Provider>
      </ValueContext.Provider>
    );
  };
  const useValue = () => useContext(ValueContext);
  const useUpdater = () => useContext(UpdaterContext);
  return { Provider, useValue, useUpdater };
}
