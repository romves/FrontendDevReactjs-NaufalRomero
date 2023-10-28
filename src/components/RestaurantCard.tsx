import { Restaurant } from "../types/types";
import RatingStar from "./ui/RatingStar";
import clsx from "clsx";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data }: { data: Restaurant }) => {
  return (
    <div className="w-full h-[410px] flex flex-col justify-between">
      <div>
        <img
          src={`https://restaurant-api.dicoding.dev/images/small/${data.pictureId}`}
          alt=""
          className="w-full h-[250px] object-cover"
        />
        <div className="my-2">
          <h3 className="text-xl font-medium">{data.name}</h3>
          <RatingStar rating={data.rating} />
          <div className="flex justify-between">
            <div className="flex gap-1">
              <p>{data.categories[0].name} •</p>
              <RatingStar rating={data.expenseLevel} variant="expense" />
            </div>
            <div className="flex items-center gap-[6px]">
              <div
                className={clsx(
                  "w-2 h-2 rounded-full bg-green-400",
                  data.isOpen === "open" ? "bg-green-400" : "bg-red-500"
                )}
              />
              <p>{data.isOpen === "open" ? "OPEN NOW" : "CLOSED"} </p>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/detail/${data.id}`}>
        <Button className="w-full">LEARN MORE</Button>
      </Link>
    </div>
  );
};

export default RestaurantCard;
