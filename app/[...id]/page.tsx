import Thread from "@/components/Thread";
import User from "@/components/User";
import { redirect } from "next/navigation";

const Page = ({ params }: any) => {
  const { id } = params;

  let pageType: any;

  if (id[0] && !id[1]) {
    pageType = "user";
  } else if (id[0] && id[1]) {
    pageType = "thread";
  } else {
    redirect("/");
  }

  const pageTypes: any = {
    "user":  <User username={id[0]} />,
    "thread":  <Thread threadId={id[1]} />
  }

  return (
    <>
      {pageTypes[pageType]}
    </>
  );
};

export default Page;
