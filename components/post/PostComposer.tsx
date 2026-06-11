"use client";

import { useRef, useTransition } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/app/lib/actions";

interface PostComposerProps {
  avatarSrc?: string;
  name: string;
}

export function PostComposer({ avatarSrc, name }: PostComposerProps) {
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function open() {
    dialogRef.current?.showModal();
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function close() {
    dialogRef.current?.close();
  }

  function submit(formData: FormData) {
    startTransition(async () => {
      await createPost(formData);
      formRef.current?.reset();
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      close();
    });
  }

  return (
    <>
      <button
        onClick={open}
        className="self-center text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer"
      >
        + Post something new
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto bg-card border border-steel-light/50 rounded-lg shadow-xl w-full max-w-lg backdrop:bg-black/40 open:flex open:flex-col open:gap-0"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar src={avatarSrc} alt={name} initials={name.slice(0, 2)} size="md" />
            <div>
              <p className="text-sm font-semibold text-ink font-display">{name}</p>
              <p className="text-xs text-steel-dark">just now</p>
            </div>
          </div>

          <form ref={formRef} action={submit} className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              name="content"
              placeholder="What's on your mind?"
              required
              rows={4}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
              className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-steel-dark focus:outline-none leading-relaxed"
            />
            <div className="flex justify-end gap-2 border-t border-steel-light/50 pt-3">
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
                {isPending ? "Posting…" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
