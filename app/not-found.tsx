import React from "react";
import Link from "next/link";
const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-6xl mt-60">404</h1>
      <h1 className="text-3xl mt-10 p-6">THERE IS NOTHING HERE!!!</h1>
      <p className="w-1/2 text-center mb-10">
        Either you entered an invalid URL, or the dev has not finished
        implementing this. It is most likely the former...
      </p>
      <Link href="/" className="underline">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;