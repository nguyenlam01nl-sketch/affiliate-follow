import * as React from "react";

type LinkModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (url: string) => void;
  /** Gợi ý link theo nền tảng/loại (tùy chọn) */
  placeholder?: string;
  /** Text hướng dẫn nhỏ bên dưới input (tùy chọn) */
  helperText?: string;
};

const LinkModal: React.FC<LinkModalProps> = ({
  open,
  onClose,
  onConfirm,
  placeholder,
  helperText,
}) => {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (!open) setUrl("");
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(url.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-slate-900 text-white shadow-xl ring-1 ring-white/10 p-5">
        <h3 className="text-base font-semibold">Nhập link bài viết hoặc profile</h3>
        <p className="mt-1 text-sm text-white/70">
          Dán link bạn muốn tăng tương tác (Instagram, TikTok, Facebook…)
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            type="url"
            inputMode="url"
            autoFocus
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // 👉 KHÔNG default IG nữa – chỉ dùng prop truyền vào
            placeholder={placeholder ?? "https://..."}
            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          {helperText && (
            <p className="text-xs text-white/70">{helperText}</p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm rounded-md bg-slate-800 hover:bg-slate-700"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-md font-semibold text-white bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-700 hover:opacity-90"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
