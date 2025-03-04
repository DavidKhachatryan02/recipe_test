'use client';

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link href="/">
      <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Back to Home
      </button>
    </Link>
  );
}