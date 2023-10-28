import { useState, useEffect } from "react";
import { Restaurant } from "../types/types";
import { IoChevronBack } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import RatingStar from "../components/ui/RatingStar";
import Button from "../components/ui/Button";
import ReviewItem from "../components/ReviewItem";

const DetailPage = () => {
  const [data, setData] = useState<Restaurant>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      const body = await res.json();
      setData(body.restaurant);
    };
    getData();
    setIsLoading(false);
  }, [id]);

  if (data) {
    return (
      <main className="container space-y-10 py-8">
        <Link to="/">
          <Button variant="outline" className="flex gap-2 items-center">
            <IoChevronBack /> Back to home
          </Button>
        </Link>
        <div className="space-y-6 flex flex-col xl:flex-row">
          <img
            src={`https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}`}
            alt=""
            className="object-cover"
          />
          <div className="space-y-8 xl:px-12">
            <h1 className="text-5xl font-semibold">{data.name}</h1>
            <p className="">{data.description}</p>

            <div className="flex gap-2 flex-1 items-center py-6 border-y">
              {data.categories.map((category, index) => (
                <div
                  key={index}
                  className="border border-cust-blue text-cust-blue rounded-lg px-4 py-1"
                >
                  {category.name}
                </div>
              ))}
            </div>

            <div className="flex gap-2 ">
              <p className="font-bold">{data.rating}</p>
              <RatingStar rating={data.rating} />|
              <p className="hover:underline cursor-pointer">
                {data.customerReviews.length} reviews
              </p>
            </div>
            <div className="w-full border-4 border-cust-blue ">
              <iframe
                title="company-address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.9291398929124!2d112.6138438330748!3d-7.954113514222278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882798ee8f48d%3A0x119af7bd320d6d73!2sGedung%20Utama%20Fakultas%20Ilmu%20Komputer!5e0!3m2!1sen!2sid!4v1697158890144!5m2!1sen!2sid"
                loading="lazy"
                className=" object-cover w-full h-[40vh]"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold">Reviews</h2>
          <ReviewItem data={data} />
        </div>
      </main>
    );
  } else if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center flex flex-col gap-8 w-max">
          <p className="text-4xl font-semibold">Loading..</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center flex flex-col gap-8 w-max">
          <p className="text-4xl font-semibold">Not Found</p>
          <Link to="/">
            <Button>Back to home page</Button>
          </Link>
        </div>
      </div>
    );
};

export default DetailPage;
