"use client";

import { useRef, useState, useTransition } from "react";
import { sendConnectionRequestByEmail } from "@/app/lib/actions";

export function AddConnectionButton() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function open() {
    setError(undefined);
    dialogRef.current?.showModal();
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function close() {
    dialogRef.current?.close();
  }

  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await sendConnectionRequestByEmail({}, formData);
      if (result.error) setError(result.error);
      else close();
    });
  }

  return (
    <>
      <button
        onClick={open}
        className="self-center text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer"
      >
        + Invite someone to your circle
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto bg-card border border-steel-light/50 rounded-lg p-5 w-80 shadow-xl backdrop:bg-black/40 open:flex open:flex-col open:gap-4"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <p className="text-sm font-semibold text-ink">Send a connection request</p>
        <form action={submit} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="text-sm bg-background border border-steel-light/50 rounded px-3 py-1.5 text-ink placeholder:text-steel-dark focus:outline-none focus:border-granite"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="text-sm font-medium px-3 py-1.5 rounded text-steel-dark hover:bg-steel-light/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
