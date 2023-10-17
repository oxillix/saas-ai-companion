import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    // user needs to be logged in
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // checking if body contains necessary companion fields for creation
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    // User needs to be pro to create a conmpanion
    const isPro = await checkSubscription();
    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }

    // create companion
    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
