import { useState, useEffect } from "react";
import { Restaurant } from "../types/types";
import { IoChevronBack } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import RatingStar from "../components/RatingStar";
import Button from "../components/Button";

const DetailPage = () => {
  const [data, setData] = useState<Restaurant>();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      const body = await res.json();
      setData(body.restaurant);
    };
    getData();
  }, [id]);

  if (data)
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
              {data.categories.map((category) => (
                <div className="border border-cust-blue text-cust-blue rounded-lg px-4 py-1">
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
          <div className="space-y-4 py-12">
            {data.customerReviews.map((item) => (
              <div className="flex items-start p-2 pb-4 md:p-4 md:pb-8 border-b justify-between">
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
                    <p className="flex-shrink-0 text-gray-500">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
};

export default DetailPage;
