import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search your files..."
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-4
          pl-14
          pr-5
          text-slate-700
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />

    </div>
  );
}

export default SearchBar;