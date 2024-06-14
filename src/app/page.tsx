import { auth } from "@/auth";
import { ItemCard } from "@/components/cards/ItemCard";
import Heading from "@/components/common/Heading";
import AuthMessage from "@/components/ui/AuthMessage";
import { database } from "@/db/database";

export default async function HomePage() {
  const session = await auth();

  if (!session || !session.user) {
    return <AuthMessage message="you are not authorized!" />;
  }

  const items = await database.query.items.findMany({ with: { user: true } });

  return (
    <section className="w-full flex flex-col items-start justify-start gap-10">
      <Heading
        title="items for sale"
        subHeading="here you can bid items that are available for sale."
      />
      <div className="flex flex-wrap items-start justify-center sm:justify-start gap-1 w-full">
        {items.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
