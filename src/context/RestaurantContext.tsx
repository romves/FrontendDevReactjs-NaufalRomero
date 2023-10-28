import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Restaurant } from "../types/types";

type ContextType = {
 filteredData: Restaurant[];
  setFilteredData: Dispatch<SetStateAction<Restaurant[]>>;
};

export const FilteredDataContext = createContext<ContextType>({
 filteredData: [],
  setFilteredData: () => {},
});

type Props = {
  children: ReactNode;
};

const FilteredDataProvider = ({ children }: Props) => {
  const [filteredData, setFilteredData] = useState<Restaurant[]>([]);
  return (
    <FilteredDataContext.Provider value={{filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
};

export default FilteredDataProvider;
