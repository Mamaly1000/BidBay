import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { isBidOver, formatToDollar } from "@/lib/utils";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image src={item.fileKey} alt={item.name} width={200} height={200} />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: ${formatToDollar(item.startingPrice)}
      </p>

      {isBidOver(item) ? (
        <p className="text-lg text-red-400">Bidding is Over</p>
      ) : (
        <p className="text-lg text-orange-400">
          Ends On: {format(item.endDate, "eeee M/dd/yy")}
        </p>
      )}

      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
