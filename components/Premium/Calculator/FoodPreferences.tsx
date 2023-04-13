import { FC } from "react";

interface Props {}

const FoodPreferences: FC<Props> = () => {
  const FOOD_PREFERENCES = [
    { value: "omnivore", name: "Omnivore" },
    { value: "gluten-free", name: "Gluten Free" },
    { value: "vegan", name: "Vegan" },
    { value: "vegeterian", name: "Vegeterian" },
  ];
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <span>Food preferences</span>
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
