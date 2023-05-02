import { FC } from "react";

interface Props {}

const NutritionTarget: FC<Props> = () => {
  return (
    <div>
      <div className="rounded-lg bg-gray-900 p-4">
        <div className="relative bg-inherit">
          <input
            type="text"
            id="username"
            name="username"
            className="peer h-10 w-36 rounded-lg bg-transparent px-2 text-gray-200 placeholder-transparent ring-2 ring-gray-500 focus:border-rose-600 focus:outline-none focus:ring-sky-600"
            placeholder="Type inside me"
          />
          <label
            htmlFor="username"
            className="absolute -top-3 left-0 mx-1 cursor-text bg-inherit px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-sky-600"
          >
            Type inside me
          </label>
        </div>
      </div>
    </div>
  );
};
