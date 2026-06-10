"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Tooltip } from "./Tooltip";

dayjs.extend(relativeTime);

interface TimestampProps {
  unix: number;
  className?: string;
}

export function Timestamp({ unix, className = "" }: TimestampProps) {
  const date = dayjs.unix(unix);

  return (
    <Tooltip content={date.format("ddd, D MMM YYYY, HH:mm")}>
      <time
        dateTime={date.toISOString()}
        className={`hover:underline underline-offset-2 cursor-default ${className}`}
      >
        {date.fromNow()}
      </time>
    </Tooltip>
  );
}
