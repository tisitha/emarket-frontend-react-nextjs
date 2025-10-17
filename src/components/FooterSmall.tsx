import Link from "next/link";
import Image from "next/image";
import React from "react";

const FooterSmall = () => {
  return (
    <div className="bg-white flex justify-around items-center py-8 outline">
      <div>
        <Link href={"/"}>
          <div className="relative w-[140px] h-[140px]">
            <Image
              loading="lazy"
              fill
              sizes="auto"
              src="/emarketLogo-l.svg"
              alt="endlogo"
            />
          </div>
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

export default FooterSmall;
