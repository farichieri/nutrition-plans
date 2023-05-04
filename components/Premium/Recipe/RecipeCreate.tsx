import { FC } from "react";

interface Props {}

const RecipeCreate: FC<Props> = () => {
  return (
    <form className="mt-8 flex max-w-xl flex-col gap-10">
      <div>
        <span>Create Recipe</span>
      </div>
      <span>Name</span>
      <span>Description</span>
      <span>Image</span>
      <div className="flex flex-col">
        <span>Properties:</span>
        <span>Prer time</span>
        <span>Cook Time</span>
        <span>Yields /cuanto rinde/</span>
        <span>Category </span>
        <span>isMainDish </span>
        <span>Type / breakfast / lunch / dinner / snack </span>
        <span>Can be easily made for just 1 serving</span>
        <span>Makes good leftovers</span>
      </div>
      <div className="flex flex-col">
        <span>Ingredients</span>
        <span>food 1, food2, food3...</span>
        <span>food searcher</span>
      </div>
      <div className="flex flex-col">
        <span>Nutrition info</span>
      </div>
      <div className="flex flex-col">
        <span>Directions:</span>
        <span>Direction 1, Direction 2...</span>
        <span>Add Direction</span>
      </div>
    </form>
  );
};
export default RecipeCreate;
