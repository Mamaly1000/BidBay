import { auth } from "@/auth";
import Heading from "@/components/common/Heading";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import AuthMessage from "@/components/ui/AuthMessage";
import Message from "@/components/ui/Message";
import pic from "./../../../public/images/undraw_delivery_truck_vt6p.svg";
import { ItemCard } from "@/components/cards/ItemCard";

const MyActionsPage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <AuthMessage message="you are unAuthorized!" />;
  }
  const userId = session.user.id;
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, userId),
    with: { user: true },
  });
  if (allItems.length === 0) {
    return (
      <Message
        image={pic.src}
        message="there is no auction!"
        action={{
          label: "create auction",
          path: "/auctions/create",
        }}
      />
    );
  }
  return (
    <section className="w-full flex flex-col items-start justify-start gap-10">
      <Heading
        title="items for sale"
        subHeading="here you can bid items that are available for sale."
      />
      <div className="flex flex-wrap items-start justify-center sm:justify-start gap-1 w-full">
        {allItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default MyActionsPage;
