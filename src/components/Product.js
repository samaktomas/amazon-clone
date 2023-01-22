import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const star = Math.floor(
      Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING
    );
    setRating(star);
  }, [rating]);

  const [hasPrime] = useState(true);
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    // Sending the product as an action to the REDUX store.
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        className="mx-auto"
        src={image}
        width={200}
        height={200}
        style={{ objectFit: "contain", width: "200px", height: "200px" }}
        alt="product"
        priority
      />
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2">{description}</p>

      <div className="mb-5 font-semibold">
        <p>{price} €</p>
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="tick"
          />

          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}
