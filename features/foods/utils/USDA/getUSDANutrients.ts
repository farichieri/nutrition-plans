import { NewNutrients, NutrientsT } from "@/features/foods/types";

type USDAFoodNutrients = {
  amount: number;
  nutrient: {
    id: number;
    name: string;
  };
}[];

const getUSDANutrients = ({
  foodNutrients,
}: {
  foodNutrients: USDAFoodNutrients;
}) => {
  const data: NutrientsT = { ...NewNutrients };

  foodNutrients.forEach((nutrient) => {
    const { id, name } = nutrient.nutrient;
    const { amount } = nutrient;

    switch (id) {
      case 1198:
        data.betaine = amount;
        break;
      case 1294:
        data.biotin = amount;
        break;
      case 1057:
        data.caffeine = amount;
        break;
      case 1087:
        data.calcium = amount;
        break;
      case 1008:
        data.calories = amount;
        break;
      case 2047:
        if (!data.calories) {
          data.calories = amount;
        }
        break;
      case 1005:
        data.carbohydrates = amount;
        break;
      case 1253:
        data.cholesterol = amount;
        break;
      case 1180:
        data.choline = amount;
        break;
      case 1098:
        data.copper = amount;
        break;
      case 1004:
        data.fats = amount;
        break;
      case 1079:
        data.fiber = amount;
        break;
      case 1099:
        data.fluoride = amount;
        break;
      case 1177:
        data.folate = amount;
        break;
      case 1012:
        data.fructose = amount;
        break;
      case 1075:
        data.galactose = amount;
        break;
      case 1011:
        data.glucose = amount;
        break;
      case 1100:
        data.iodine = amount;
        break;
      case 1089:
        data.iron = amount;
        break;
      case 1013:
        data.lactose = amount;
        break;
      case 1122:
        data.lycopene = amount;
        break;
      case 1090:
        data.magnesium = amount;
        break;
      case 1014:
        data.maltose = amount;
        break;
      case 1101:
        data.manganese = amount;
        break;
      case 1292:
        data.monounsaturated_fats = amount;
        break;
      case 1167:
        data.niacin = amount;
        break;
      case 1170:
        data.panthotenic_acid = amount;
        break;
      case 1091:
        data.phosphorus = amount;
        break;
      case 1293:
        data.polyunsaturated_fats = amount;
        break;
      case 1092:
        data.potassium = amount;
        break;
      case 1003:
        data.proteins = amount;
        break;
      case 1105:
        data.retinol = amount;
        break;
      case 1258:
        data.saturated_fats = amount;
        break;
      case 1103:
        data.selenium = amount;
        break;
      case 1093:
        data.sodium = amount;
        break;
      case 1010:
        data.sucrose = amount;
        break;
      case 2000:
        data.sugar = amount;
        break;
      case 1165:
        data.thiamine = amount;
        break;
      case 1257:
        data.trans_fats = amount;
        break;
      case 1106:
        data.vitamin_a = amount;
        break;
      case 1166:
        data.riboflavin = amount;
        break;
      case 1178:
        data.vitamin_b12 = amount;
        break;
      case 1175:
        data.vitamin_b6 = amount;
        break;
      case 1162:
        data.vitamin_c = amount;
        break;
      case 1114:
        data.vitamin_d = amount;
        break;
      case 1111:
        data.vitamin_d2 = amount;
        break;
      case 1112:
        data.vitamin_d3 = amount;
        break;
      case 1109:
        data.vitamin_e = amount;
        break;
      case 1185:
        data.vitamin_k = amount;
        break;
      case 1051:
        data.water = amount;
        break;
      case 1095:
        data.zinc = amount;
        break;
      case 1210:
        data.trypthophan = amount;
        break;
      case 1211:
        data.threonine = amount;
        break;
      case 1212:
        data.isoleucine = amount;
        break;
      case 1213:
        data.leucine = amount;
        break;
      case 1214:
        data.lysine = amount;
        break;
      case 1215:
        data.methionine = amount;
        break;
      case 1217:
        data.phenylalanine = amount;
        break;
      case 1219:
        data.valine = amount;
        break;
      case 1224:
        data.glutamic_acid = amount;
        break;
      default:
        break;
    }
  });

  // if no amount, set to 0
  Object.keys(data).forEach((key) => {
    if (!data[key as keyof NutrientsT]) {
      data[key as keyof NutrientsT] = 0;
    }
  });

  return data;
};

export { getUSDANutrients };
