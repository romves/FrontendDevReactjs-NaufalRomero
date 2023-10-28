import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import FilteredDataProvider from "./context/RestaurantContext";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <FilteredDataProvider>
            <Home />
          </FilteredDataProvider>
        }
      />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
