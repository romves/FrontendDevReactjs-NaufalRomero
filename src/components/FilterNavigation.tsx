import { useContext, useState, useEffect, useCallback } from "react";

import { FilteredDataContext } from "../context/RestaurantContext";
import Button from "./Button";
import { Restaurant } from "../types/types";

const FilterNavigation = () => {
  const { setFilteredData } = useContext(FilteredDataContext);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filter, setFilter] = useState({
    status: "",
    priceFilter: "",
    categoryFilter: "",
  });

  const fetchCategory = useCallback(async (id: string) => {
    try {
      const res = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      const { restaurant } = await res.json();
      return restaurant.categories;
    } catch (error) {
      console.error("Error fetching category:", error);
      return "Category Not Found";
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://restaurant-api.dicoding.dev/list");
      const { restaurants: restaurantData } = await res.json();

      const restaurantModified = await Promise.all(
        restaurantData.map(async (item: Restaurant) => {
          const isOpen = Math.random() >= 0.5 ? "open" : "closed";
          const expenseLevel = Math.floor(Math.random() * 5) + 1;
          const categories = await fetchCategory(item.id);
          return { ...item, categories, isOpen, expenseLevel };
        })
      );
      setRestaurants(restaurantModified);
      setFilteredData(restaurantModified);
    };
    getData();
  }, [fetchCategory, setFilteredData]);

  useEffect(() => {
    let filteredRestaurants = restaurants;

    if (filter.categoryFilter) {
      const fetchData = async () => {
        try {
          const query = filter.categoryFilter;
          const res = await fetch(
            `https://restaurant-api.dicoding.dev/search?q=${query}`
          );
          const { restaurants: filteredData } = await res.json();
          const restaurantModified = await Promise.all(
            filteredData.map(async (item: Restaurant) => {
              const isOpen = Math.random() >= 0.5 ? "open" : "closed";
              const expenseLevel = Math.floor(Math.random() * 5) + 1;
              const categories = await fetchCategory(item.id);
              return { ...item, categories, isOpen, expenseLevel };
            })
          );
          setFilteredData(restaurantModified);
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        }
      };
      fetchData();
    } else {
      setFilteredData(filteredRestaurants);
    }

    if (filter.status === "open") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.isOpen === "open"
      );
    } else if (filter.status === "closed") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.isOpen === "closed"
      );
    }

    let sortedRestaurants = [...filteredRestaurants];

    if (filter.priceFilter === "highest") {
      sortedRestaurants = sortedRestaurants.sort(
        (a, b) => b.expenseLevel - a.expenseLevel
      );
    } else if (filter.priceFilter === "lowest") {
      sortedRestaurants = sortedRestaurants.sort(
        (a, b) => a.expenseLevel - b.expenseLevel
      );
    }

    setFilteredData(sortedRestaurants);
  }, [fetchCategory, filter, restaurants, setFilteredData]);

  const clearAllFilters = () => {
    setFilter({
      status: "",
      priceFilter: "",
      categoryFilter: "",
    });
  };

  return (
    <div className="flex justify-between w-full border-y py-4">
      <div className="overflow-x-auto flex justify-between gap-8 w-full">
        <div className="flex gap-4 items-center flex-shrink-0">
          <p>Filter By:</p>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="open">Open Now</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filter.priceFilter}
            onChange={(e) =>
              setFilter({ ...filter, priceFilter: e.target.value })
            }
          >
            <option value="">Select Price</option>
            <option value="highest">Highest Price</option>
            <option value="lowest">Lowest Price</option>
          </select>
          <select
            value={filter.categoryFilter}
            onChange={(e) =>
              setFilter({ ...filter, categoryFilter: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Italia">Italia</option>
            <option value="Modern">Modern</option>
            <option value="Jawa">Jawa</option>
          </select>
        </div>

        <Button variant="outline" className="px-8 md:px-10 flex-shrink-0" onClick={clearAllFilters}>
          CLEAR ALL
        </Button>
      </div>
    </div>
  );
};

export default FilterNavigation;
