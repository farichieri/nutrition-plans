const FOOD_PREFERENCES = [
  { value: "anything", name: "Anything", includes: "", excludes: "Nothing" },
  {
    value: "gluten_free",
    name: "Gluten Free",
    includes: "",
    excludes:
      "gluten-containing foods such as wheat, oats, barley, rye, and triticale (a cross between wheat and rye).",
  },
  {
    value: "vegetarian",
    name: "Vegetarian",
    includes: "",
    excludes:
      "animal foods such as red beef, white meat such as chicken, pork, turkey and fish.",
  },
  {
    value: "flexitarian",
    name: "Flexitarian",
    includes:
      "plant foods (fruits, vegetables, whole grains, nuts, seeds) but, unlike vegetarians",
    excludes: "does not exclude meat and fish entirely.",
  },
  // { value: "ketogenic", name: "Ketogenic", includes: "", excludes: "" },
  {
    value: "mediterranean",
    name: "Mediterranean",
    includes:
      "foods such as vegetables and fruits, legumes, fish and shellfish, whole grains, white meat, and nuts, decreasing the amount of consumption of red meat and carbohydrates in favor of vegetables and monounsaturated fats such as Olive oil mainly.",
    excludes: "",
  },
  {
    value: "low_carb",
    name: "Low Carb",
    includes:
      "foods rich in protein and fat and limit the amount of refined carbohydrates you eat, favoring complex carbohydrates such as vegetables, fruits and some grains.",
    excludes: "",
  },
];

export { FOOD_PREFERENCES };
