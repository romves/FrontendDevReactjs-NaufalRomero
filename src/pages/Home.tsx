import { useContext, useState } from "react";
import Button from "../components/ui/Button";
import FilterNavigation from "../components/FilterNavigation";
import RestaurantCard from "../components/RestaurantCard";
import { FilteredDataContext } from "../context/RestaurantContext";

const Home = () => {
  const { filteredData: restaurants } = useContext(FilteredDataContext);
  const [dataCount, setDataCount] = useState(8);

  return (
    <main className="container space-y-10 py-8">
      <div className="space-y-6 md:w-3/5">
        <h1 className="text-5xl">Restaurants</h1>
        <p className="text-xl font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quasi
          unde veritatis sed, deserunt eos minus debitis velit aut quibusdam.
        </p>
      </div>

      <FilterNavigation />

      <div className="space-y-8">
        <h2 className="text-3xl">All Restaurants</h2>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-8">
          {restaurants &&
            restaurants
              .slice(0, dataCount)
              .map((item) => <RestaurantCard key={item.id} data={item} />)}
        </div>
      </div>
      {restaurants && dataCount < restaurants?.length && (
        <div className="w-full flex justify-center pt-4">
          <Button
            variant="outline"
            className="w-1/3"
            onClick={() => {
              setDataCount(dataCount + 8);
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </main>
  );
};

export default Home;
