import { TVProduction } from "@/components/TVProduction";

export default function AllProductionsPage({ params } : {params : TVProduction}) {
  return (
    <main>
      <h1>{params.title}</h1>
      <p>{params.slug}</p>
      <p>{params.more}</p>
    </main>
  );
}
