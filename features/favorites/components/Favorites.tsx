import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";

interface Props {}

const Favorites: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);

  return <div>Favorites</div>;
};

export default Favorites;
