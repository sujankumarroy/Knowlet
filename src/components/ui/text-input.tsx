interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
}

export default function TextInput({ onChange, label, placeholder }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}
