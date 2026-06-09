interface SkeletonProps {
  className?: string;
}

function Bone({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-steel-light/60 rounded animate-pulse ${className}`}
    />
  );
}

export function PostSkeleton() {
  return (
    <div className="bg-card border border-steel-light/50 rounded p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Bone className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Bone className="h-3 w-28" />
          <Bone className="h-2.5 w-20" />
        </div>
      </div>
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-5/6" />
      <Bone className="h-3 w-3/4" />
      <Bone className="h-48 w-full rounded" />
      <div className="flex gap-4">
        <Bone className="h-4 w-12" />
        <Bone className="h-4 w-12" />
        <Bone className="h-4 w-12" />
      </div>
    </div>
  );
}

export { Bone as Skeleton };
