import { FC } from "react";

interface Props {}

const FoodPreferences: FC<Props> = () => {
  const FOOD_PREFERENCES = [
    { value: "anything", name: "Anything" },
    { value: "gluten-free", name: "Gluten Free" },
    { value: "vegetarian", name: "Vegetarian" },
    { value: "flexitarian", name: "Flexitarian" },
    { value: "ketogenic", name: "Ketogenic" },
    { value: "mediterranean", name: "Mediterranean" },
    { value: "low-carb", name: "Low Carb" },
  ];

  // Que pueda seleccionar varios a la vez (podrian ser botones)
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <span className="text-3xl font-bold">Nutrition preferences</span>
      <form action="" className="w-full max-w-[30rem]">
        <select
          name=""
          id=""
          defaultValue="none"
          className="w-full rounded-md border bg-transparent px-2 py-1"
        >
          <option
            value="none"
            className="bg-gray-300 text-black"
            disabled
            hidden
          >
            Select
          </option>
          {FOOD_PREFERENCES.map((opt) => (
            <option
              className="bg-gray-300 text-black"
              key={opt.value}
              value={opt.value}
            >
              {opt.name}
            </option>
          ))}
        </select>
      </form>
    </section>
  );
};

export default FoodPreferences;
