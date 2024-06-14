import { Button } from "@/components/ui/button";
import { Item, User } from "@/db/schema";
import { format, formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { isBidOver, formatToDollar } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

export function ItemCard({ item }: { item: Item & { user: User } }) {
  return (
    <article className="shadow-sm flex flex-col min-w-full max-w-full sm:min-w-[200px] sm:max-w-[200px] shadow-slate-900 bg-neutral-800 p-0 relative  min-h-[300px] max-h-[300px] group hover:bg-orange-900 hover:bg-opacity-60 transition-all">
      <section className="relative aspect-square w-full h-[153px] p-0 flex items-center justify-center overflow-hidden">
        <Image
          src={item.fileKey}
          alt={item.name}
          fill
          className="object-cover w-full  group-hover:scale-110 transition-all"
        />
        <Badge
          variant={isBidOver(item) ? "destructive" : "default"}
          className="absolute z-10 flex items-center justify-center p-1 top-0 left-0 text-white text-[13px]  rounded-none font-extralight drop-shadow-2xl group-hover:bg-orange-700"
        >
          {isBidOver(item) ? (
            <p className="   ">Bidding is Over</p>
          ) : (
            <p className="flex items-center justify-start gap-1  w-full line-clamp-1">
              Ends{" "}
              {formatDistanceToNowStrict(item.endDate, { addSuffix: true })}
              <Clock className="w-3 h-3 group-hover:animate-spin" />
            </p>
          )}
        </Badge>
      </section>
      <section className="relative font-extralight flex items-start justify-between flex-col p-2 capitalize min-h-[147px] max-h-[147px] overflow-hidden">
        <section className="flex w-full flex-col items-start justify-start">
          <h2 className="text-[18px] text-white capitalize line-clamp-1 w-full">
            {item.name}
          </h2>
          <p className="text-[14px] font-light line-clamp-1">
            <span className="text-slate-300 mr-2 ">by</span>
            {item.user?.name}
          </p>
        </section>

        <Separator className="w-full bg-neutral-700" />
        <p className="text-[14px] font-light text-orange-300">
          starting price: ${formatToDollar(item.startingPrice)}
        </p>
        <Button
          asChild
          className="rounded-none drop-shadow-2xl w-full capitalize"
          variant={isBidOver(item) ? "destructive" : "default"}
        >
          <Link href={`/items/${item.id}`}>
            {isBidOver(item) ? "View Bid" : "join auction"}
          </Link>
        </Button>
      </section>
    </article>
  );
}
