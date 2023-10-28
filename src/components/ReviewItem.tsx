import { Restaurant } from "../types/types";
import RatingStar from "./ui/RatingStar";

const ReviewItem = ({ data }: { data: Restaurant }) => {
  return (
    <div className="space-y-4 py-12">
      {data.customerReviews.map((item, index) => {
        const rating = Math.floor(Math.random() * 5) + 1;
        return (
          <div
            className="flex items-start p-2 pb-4 md:p-4 md:pb-8 border-b justify-between"
            key={index}
          >
            <div className="flex gap-4 w-full">
              <img
                src="/images/user.png"
                alt=""
                className="w-[5vh] h-[5vh] aspect-square flex-shrink-0 object-cover rounded-full border-2 "
              />
              <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.review}</p>
                </div>
                <div className="flex flex-col md:items-end">
                  <p className="flex-shrink-0 text-gray-500">{item.date}</p>
                  <RatingStar rating={rating} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewItem;
