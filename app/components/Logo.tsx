'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative w-[180px] h-[60px]">
        <Image
          src="https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/pt82Q1M.jpeg?updatedAt=1745651316824"
          alt="Dhanlaxmi Motor Logo"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </Link>
  );
}
