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
import Link from "next/link";
import RefreshBtn from "@/components/ui/RefreshBtn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import UserAvatar from "@/components/ui/UserAvatar";

const ItemPage = async ({ params }: { params: { itemId: string } }) => {
  const session = await auth();
  if (!session || !session.user) {
    return <AuthMessage message="You must be logged in to place a bid!" />;
  }
  if (isNaN(parseFloat(params?.itemId))) {
    return <Message image={pic.src} message="item id is not valid!" />;
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
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
      <div className="flex flex-col gap-6">
        <Heading
          title={`auction for ${item.name}`}
          subHeading="here you can place a bid for this item."
        />

        {isBidOver(item) && (
          <Badge className="w-fit" variant="destructive">
            Bidding Over
          </Badge>
        )}
        <div className="relative flex items-center justify-center aspect-video w-full md:w-[400px] md:max-h-[400px]">
          <Image
            className="rounded-xl drop-shadow-2xl"
            src={item.fileKey}
            alt={item.name}
            fill
          />
        </div>
        <div className="text-xl space-y-4">
          <div className="text-sm">
            Current Bid:
            <span className="font-bold text-green-500 ml-2 text-[20px]">
              ${formatToDollar(item.currentBid)}
            </span>
          </div>
          <div className="text-sm">
            Starting Price of:
            <span className="font-bold text-green-500 ml-2 text-[20px]">
              ${formatToDollar(item.startingPrice)}
            </span>
          </div>
          <div className="text-sm">
            Bid Interval:
            <span className="font-bold text-green-500 ml-2 text-[20px]">
              ${formatToDollar(item.bidInterval)}
            </span>
          </div>
        </div>
      </div>
      <ScrollArea className=" max-h-screen pe-5">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {canPlaceBid ? (
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          ) : (
            <RefreshBtn label="refresh" />
          )}
        </div>

        {hasBids ? (
          <ul className="space-y-4">
            {allBids.map((bid) => (
              <li key={bid.id} className="bg-gray-900 rounded-xl p-8">
                <div className="flex gap-4">
                  <div className="flex items-center justify-start gap-2">
                    <span className="font-bold">
                      ${formatToDollar(bid.amount)}
                    </span>
                    by
                    <span className="font-bold flex items-center justify-start gap-2">
                      <UserAvatar
                        fallback={bid.user.name}
                        src={bid.user.image}
                        alt={bid.user.name}
                      />
                      {bid.user.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    {formatDistanceToNowStrict(bid.timestamp, {
                      addSuffix: true,
                    })}
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-8 bg-gray-900 rounded-xl p-12">
            <Image src={noBidPic.src} width="200" height="200" alt="Package" />
            <h2 className="text-2xl font-bold">No bids yet</h2>
            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            )}
          </div>
        )}
      </ScrollArea>
    </section>
  );
};

export default ItemPage;
