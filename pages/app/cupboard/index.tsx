import ShoppingNav from "@/features/shopping/components/ShoppingNav";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

interface Props {}

export default function Page(): Props {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />

      <section className="mt-[var(--subnav-h)] flex w-full flex-col gap-5 p-2 sm:px-4">
        <ShoppingNav />
        {/* <div className="flex flex-wrap items-center gap-1">
          <span className="text-2xl font-medium">Shopping List of:</span>
          <DateSelector />
        </div> */}
        {/* {isLoading ? (
          <Spinner customClass="w-5 h-5" />
        ) : (
          <ShoppingList foods={foods} />
        )} */}
      </section>
    </PremiumLayout>
  );
}
