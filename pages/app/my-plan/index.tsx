import PremiumLayout from "@/layouts/PremiumLayout";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR<any[]>("/api/users", fetcher);

  return (
    <PremiumLayout>
      <section className="p-4">
        <span>My Plan</span>
      </section>
    </PremiumLayout>
  );
}
