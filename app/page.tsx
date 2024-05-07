
import { ArrowRightIcon } from 'lucide-react';
import { Lusitana } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import AcmeLogo from '@/components/acme-logo';
import { auth } from '@clerk/nextjs';
const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

export default function Page() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow gap-4 md:flex-row flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to e-learning application.</strong> This is an elearning platform built with Next.js, a popular React framework for creating high-performance and scalable web applications.
          </p>
          <Link
            href={userId ? "/dashboard":"/sign-in"}
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={400}
            height={210}
            alt="Screenshots of the dashboard project showing desktop version"
            className="hidden md:block"
          />
          <Image
            src="/hero-mobile.png"
            width={280}
            height={200}
            alt="Screenshot of the dashboard project showing mobile version"
            className="block md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
