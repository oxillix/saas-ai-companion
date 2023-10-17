import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    // TODO: this is hacky. Ideally, a non logged in user should get 10 free messages.
    // return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: { id: params.chatId },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        // where: {
        //   userId,
        // },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
