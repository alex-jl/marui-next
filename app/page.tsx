import Image from "next/image";
import Link from "next/link";

export default function Root() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface">
      <Image src="/icon.svg" alt="marui" width={96} height={96} priority />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-medium tracking-wide text-ink">marui</h1>
      </div>
      <Link
        href="/feed"
        className="mt-4 border border-granite px-6 py-2 text-sm text-granite transition-colors hover:bg-granite hover:text-white"
      >
        enter the circle
      </Link>
    </main>
  );
}
