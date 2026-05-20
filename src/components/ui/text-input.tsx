import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, ...props }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        type="text"
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}
