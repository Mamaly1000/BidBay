import Message from "@/components/ui/Message";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import pic from "../../../../public/images/undraw_delivery_truck_vt6p.svg";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { formatToDollar, isBidOver } from "@/lib/utils";
import noBidPic from "./../../../../public/images/undraw_delivery_truck_vt6p.svg";
import { auth } from "@/auth";
import AuthMessage from "@/components/ui/AuthMessage";
import { createBidAction, getBidsForItem } from "./actions";
import { Button } from "@/components/ui/button";
import { formatDistanceToNowStrict } from "date-fns";

const ItemPage = async ({ params }: { params: { itemId: string } }) => {
  const session = await auth();
  if (!session || !session.user) {
    return <AuthMessage message="You must be logged in to place a bid!" />;
  }
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(params.itemId)),
  });
  if (!item) {
    return (
      <Message
        image={pic.src}
        message=" The item you're trying to view is invalid. Please go back and search for a different auction item."
        action={{ label: "redirect to mainpage", path: "/" }}
      />
    );
  }

  const allBids = await getBidsForItem(item.id);

  const hasBids = allBids.length > 0;

  const canPlaceBid =
    session && item.userId !== session.user.id && !isBidOver(item);

  return (
    <section className="w-full flex flex-col items-start justify-start gap-10">
      <div className="flex flex-col gap-6">
        <Heading title={`auction for ${item.name}`} />

        {/* {isBidOver(item) && (
            <Badge className="w-fit" variant="destructive">
              Bidding Over
            </Badge>
          )} */}

        <Image
          className="rounded-xl"
          src={item.fileKey}
          alt={item.name}
          width={400}
          height={400}
        />
        <div className="text-xl space-y-4">
          <div>
            Current Bid{" "}
            <span className="font-bold">
              ${formatToDollar(item.currentBid)}
            </span>
          </div>
          <div>
            Starting Price of{" "}
            <span className="font-bold">
              ${formatToDollar(item.startingPrice)}
            </span>
          </div>
          <div>
            Bid Interval{" "}
            <span className="font-bold">
              ${formatToDollar(item.bidInterval)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {canPlaceBid && (
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          )}
        </div>

        {hasBids ? (
          <ul className="space-y-4">
            {allBids.map((bid) => (
              <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                <div className="flex gap-4">
                  <div>
                    <span className="font-bold">
                      ${formatToDollar(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.user.name}</span>
                  </div>
                  <div className="">
                    {formatDistanceToNowStrict(bid.timestamp)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
            <Image src={noBidPic.src} width="200" height="200" alt="Package" />
            <h2 className="text-2xl font-bold">No bids yet</h2>
            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemPage;
