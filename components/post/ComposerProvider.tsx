"use client";

import { createContext, useContext, useEffect, useRef, useState, useTransition } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/app/lib/actions";

const ComposerContext = createContext<{ open: () => void }>({ open: () => {} });

export function useComposer() {
  return useContext(ComposerContext);
}

interface ComposerProviderProps {
  name: string;
  avatarSrc?: string;
  children: React.ReactNode;
}

export function ComposerProvider({ name, avatarSrc, children }: ComposerProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  function open() {
    dialogRef.current?.showModal();
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function close() {
    dialogRef.current?.close();
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    });
  }

  function removePreview(index: number) {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      const next = prev.filter((_, i) => i !== index);
      const dt = new DataTransfer();
      Array.from(fileInputRef.current?.files ?? [])
        .filter((_, i) => i !== index)
        .forEach((f) => dt.items.add(f));
      if (fileInputRef.current) fileInputRef.current.files = dt.files;
      return next;
    });
  }

  function submit(formData: FormData) {
    startTransition(async () => {
      await createPost(formData);
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "auto";
      }
      formRef.current?.reset();
      setPreviews([]);
      close();
    });
  }

  return (
    <ComposerContext.Provider value={{ open }}>
      {children}

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

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((p, i) => (
                  <div key={p.url} className="relative aspect-square rounded overflow-hidden bg-surface">
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesChange}
              className="hidden"
            />

            <div className="flex items-center justify-between border-t border-steel-light/50 pt-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded text-steel-dark hover:text-ink hover:bg-steel-light/10 transition-colors cursor-pointer"
              >
                <PhotoIcon className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
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
            </div>
          </form>
        </div>
      </dialog>
    </ComposerContext.Provider>
  );
}
