import Link from "next/link";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <div className="w-screen h-screen bg-gradient-to-r from-secondary-content to-indigo-600 absolute"></div>
      <div className="glass flex font-bold w-[50rem] max-w-[80%] flex-col gap-6 items-center relative z-10 px-10 py-5 text-center rounded-md backdrop-blur-sm">
        <Logo />
        <p>
          Discover the future of content creation at OpenAI-Blog. Our
          AI-generated blog platform delivers captivating articles on diverse
          topics, blending technology and creativity seamlessly. Explore the
          possibilities today!
        </p>
        <Link className="btn btn-secondary w-full hover:no-underline text-xl" href="/post/new">
          Login
        </Link>
      </div>
    </div>
  );
}
