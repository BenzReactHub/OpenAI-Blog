import Link from "next/link";
import { PiCoinsFill } from "react-icons/pi";
import { useNav } from "../../context/NavContext";

const Tokens = () => {
  const { availableToken } = useNav();
  return (
    <>
      <Tokens.Mobile>
        <PiCoinsFill className="text-yellow-500 text-2xl" />
        <span className="badge badge-sm indicator-item">
          {availableToken > 100 ? "99+" : availableToken}
        </span>
      </Tokens.Mobile>
      <Tokens.Desktop>
        <PiCoinsFill className="text-yellow-500 text-2xl" />
        <span className="pl-1">
          {availableToken > 100 ? "99+" : availableToken} tokens available
        </span>
      </Tokens.Desktop>
    </>
  );
};

const Mobile = ({ children }) => {
  return (
    <Link href="/token-topup" className="lg:hidden">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">{children}</div>
      </div>
    </Link>
  );
};

const Desktop = ({ children }) => {
  return (
    <Link
      href="/token-topup"
      className="hidden lg:flex my-2 items-center justify-center gap-2 mt-2 text-center"
    >
      {children}
    </Link>
  );
};

Tokens.Mobile = Mobile;
Tokens.Desktop = Desktop;

export default Tokens;
