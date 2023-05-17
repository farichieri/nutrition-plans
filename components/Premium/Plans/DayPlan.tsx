import { fetchFoodsByIDS } from "@/firebase/helpers/Food";
import { getToday } from "@/utils/dateFormat";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUserPlan } from "@/firebase/helpers/Plans";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DaySelector from "@/components/Premium/Plans/DaySelector";

interface Props {
  planData: any;
}

const MEAL_PLAN_DAY_EXAMPLE = {
  date_created: "xxxxxxxxxxx",
  plan_id: "balanced",
  num_meals: 4,
  meal_plan_id: "ASDKLXL7893425XM",
  meals: {
    1: {
      meal_id: "ASKLDJALSKDJKAS",
      foods: {
        Cbgaj8C9KitFtWMFVSk1: {
          food_id: 'Cbgaj8C9KitFtWMFVSk1',
          amount: 1,
          weight_name: "serving",
        },
        F8gT3VIxiieQ0WP8Pt9u: {
          meal_id: "F8gT3VIxiieQ0WP8Pt9u",
          amount: 1,
          weight_name: "serving",
        }
      },
    },
    2: {
      meal_id: "ASKLDJALSK123123DJKAS",
      foods: {
        VxOrF4McQZOxGAJ1M9NF: {
          meal_id: "VxOrF4McQZOxGAJ1M9NF",
          amount: 1,
          weight_name: "serving",
        },
      },
    },
    3: {
      meal_id: "ASKLDJALSKDJKEEEEEAS",
      foods: {
        QMc305KQeDBWmgoQDd6y: {
          food_id: 'QMc305KQeDBWmgoQDd6y',
          amount: 1,
          weight_name: "serving",
        },
      },
    },
    4: {
      meal_id: "ASKLDJALSKDJKAS",
      foods: {
        khjj4zFUJLb6on0bu8O4: {
          food_id: 'khjj4zFUJLb6on0bu8O4',
          amount: 1,
          weight_name: "serving",
        },
      },
    },
  },
  // date: "05-15-2023",
};

const DayPlan = ({ planData }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const isToday = getToday();

  const selectPlan = async () => {
    if (!user) return;
    const res = await updateUserPlan(planData, user);
    if (!res?.error) {
      const userUpdated = {
        ...user,
        plan_selected: planData.id,
      };
      dispatch(setUpdateUser(userUpdated));
    }
  };

  const fetchFoodsData = async (foods: any) => {
    const ids = Object.keys(foods).map((f) => foods[f].meal_id);
    const result = await fetchFoodsByIDS(ids);
    return result;
  };

  useEffect(() => {
    // const data = fetchFoodsByIDS(MEAL_PLAN_DAY_EXAMPLE.meals)
  }, []);

  const isFree = user?.premium_plan === "free";

  return (
    <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
      <div className="flex max-w-lg flex-col gap-10">
        <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center gap-10 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80">
          <span className="ml-5 font-semibold sm:text-xl">{planData.name}</span>
          <div className="flex w-fit min-w-fit items-center">
            {!(user?.plan_selected === planData.id) ? (
              <button
                className="min-w-fit rounded-3xl border border-green-500 px-4 py-1 duration-300 hover:bg-green-500/50 active:bg-green-500/20"
                onClick={selectPlan}
              >
                Make my plan
              </button>
            ) : (
              <span className={`material-icons ml-auto text-green-500`}>
                verified
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[1vw] sm:px-10">
        <DaySelector />
        <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-10">
          <div
            className={`${
              isFree &&
              "z-50 flex h-full w-full max-w-5xl cursor-auto select-none flex-col gap-5"
            } max-w-5xl`}
          >
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Breakfast</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Lunch</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Dinner</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Snack</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DayPlan;
