import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-white flex justify-around items-center pt-30 pb-20 outline">
      <div>
        <Link href={""}>
          <Image
            width={125}
            height={40}
            src="/emarketLogo-l.svg"
            alt="endlogo"
          />
        </Link>
        <h3>©2025. All Rights Reserved</h3>
      </div>
      <div className=" flex items-center gap-2">
        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={32}
            height={32}
            draggable="false"
            src="/FACEBOOK.svg"
            alt="vist our facebook page"
          />
        </Link>
        <Link
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={32}
            height={32}
            draggable="false"
            src="/INSTAGRAM.svg"
            alt="vist our instagram page"
          />
        </Link>
        <Link
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={32}
            height={32}
            draggable="false"
            src="/LINKEDIN.svg"
            alt="vist our linkedin page"
          />
        </Link>
        <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
          <Image
            width={32}
            height={32}
            draggable="false"
            src="/X.svg"
            alt="vist our X page"
          />
        </Link>
        <Link
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={32}
            height={32}
            draggable="false"
            src="/YOUTUBE.svg"
            alt="vist our youtube page"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
