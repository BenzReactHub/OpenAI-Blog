import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppLayout from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Success() {
  return (
    <div className="h-full lg:mt-36">
      <div className="text-center w-[20rem] lg:w-[30rem] m-auto ">
        <div role="alert" className="alert alert-success flex flex-col lg:flex-row items-center justify-center">
          <IoCheckmarkCircleOutline className="text-4xl text-white"/>
          <span className="text-xl lg:text-2xl font-bold text-white">Thank you for your purchase!</span>
        </div>
      </div>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
