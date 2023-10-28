import { LiaStarSolid, LiaStarHalfAltSolid, LiaStar } from "react-icons/lia";
import { BsCurrencyDollar } from "react-icons/bs";

enum RatingVariant {
  "default",
  "expense",
}

type RatingStar = {
  rating: number;
  variant?: keyof typeof RatingVariant;
};

const RatingStar = ({ rating, variant = "default" }: RatingStar) => {
  const filledStars = Math.floor(rating);
  const halfStars = rating - filledStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <div className="flex py-1">
      {Array.from({ length: filledStars }).map((_, index) =>
        variant === "expense" ? (
          <BsCurrencyDollar key={index} className='-mr-[6px]'/>
        ) : (
          <LiaStarSolid key={index} className='text-cust-blue'/>
        )
      )}
      {variant === "default" &&
        Array.from({ length: halfStars }).map((_, index) => (
          <LiaStarHalfAltSolid key={index} className='text-cust-blue'/>
        ))}
      {variant === "default" &&
        Array.from({ length: emptyStars }).map((_, index) => (
          <LiaStar key={index} className='text-cust-blue'/>
        ))}
    </div>
  );
};

export default RatingStar;
