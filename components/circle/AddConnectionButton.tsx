"use client";

import { useRef, useState, useTransition } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { sendConnectionRequestByEmail } from "@/app/lib/actions";

function useInviteDialog() {
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

  const dialog = (
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
  );

  return { open, dialog };
}

export function AddConnectionButton() {
  const { open, dialog } = useInviteDialog();
  return (
    <>
      <button
        onClick={open}
        className="self-center text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer"
      >
        + Invite someone to your circle
      </button>
      {dialog}
    </>
  );
}

export function EmptyConnectionSlot() {
  const { open, dialog } = useInviteDialog();
  return (
    <>
      <button
        onClick={open}
        className="aspect-square w-10 h-10 rounded-full border border-dashed border-steel-dark/50 hover:border-granite hover:bg-granite/5 hover:text-granite transition-colors cursor-pointer flex items-center justify-center text-steel-dark"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
      {dialog}
    </>
  );
}
