interface FeedProps {
  children: React.ReactNode;
  className?: string;
}

export function Feed({ children, className = "" }: FeedProps) {
  return (
    <main className={`max-w-2xl mx-auto w-full px-4 py-4 flex flex-col gap-3 pb-24 ${className}`}>
      {children}
    </main>
  );
}
