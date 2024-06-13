"use server";
import { auth } from "@/auth";
import { items } from "../../../db/schema";
import { database } from "@/db/database";
import { redirect } from "next/navigation";
export async function createItemAction({
  fileKey,
  name,
  startingPrice,
  endDate,
}: {
  fileKey: string;
  name: string;
  startingPrice: number;
  endDate: Date;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  const userId = user.id;

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey,
    currentBid: startingPrice,
    userId,
    endDate,
  });

  redirect("/");
}
