import Link from "next/link";

interface PaginationProps {
  page: number;
  hasOlder?: boolean;
}

export function Pagination({ page, hasOlder = true }: PaginationProps) {
  const isFirst = page <= 1;

  const linkClass = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors cursor-pointer select-none bg-transparent text-granite hover:bg-granite hover:text-white";

  return (
    <div className="grid grid-cols-3 items-center pt-2">
      <div>
        {!isFirst && (
          <Link href={`?page=${page - 1}`} className={linkClass}>
            ← Newer
          </Link>
        )}
      </div>

      <div className="flex justify-center">
        <span className="text-xs text-steel">Page {page}</span>
      </div>

      <div className="flex justify-end">
        {hasOlder && (
          <Link href={`?page=${page + 1}`} className={linkClass}>
            Older →
          </Link>
        )}
      </div>
    </div>
  );
}
