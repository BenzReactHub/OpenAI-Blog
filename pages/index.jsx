import Image from "next/image";
import Link from "next/link";
import Logo from "../components/Logo";
import HeroImage from "../public/hero.webp";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="hero" fill className="absolute" />
      <div className="flex flex-col gap-6 items-center relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
        <p>
          Discover the future of content creation at OpenAI-Blog. Our
          AI-generated blog platform delivers captivating articles on diverse
          topics, blending technology and creativity seamlessly. Explore the
          possibilities today!
        </p>
        <Link className="btn" href="/post/new">
          Login
        </Link>
      </div>
    </div>
  );
}
