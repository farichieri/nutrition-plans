import React, { FC, useEffect, useState } from "react";

interface Props {}

const FoodSearch: FC<Props> = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  useEffect(() => {}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder="Search"
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
};

export default FoodSearch;
