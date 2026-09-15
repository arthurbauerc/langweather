"use client";

import { motion } from "framer-motion";

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  accentColor: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  accentColor,
}: CheckboxProps) {
  return (
    <label className="group flex cursor-pointer select-none items-center gap-3 py-1.5 text-sm text-paper">
      <span
        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
          checked ? "" : "border-line"
        }`}
        style={{
          borderColor: checked ? accentColor : undefined,
          backgroundColor: checked ? accentColor : "transparent",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <motion.svg
          viewBox="0 0 16 16"
          className="h-3 w-3"
          initial={false}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.path
            d="M3 8.3L6.3 11.5L13 4.5"
            fill="none"
            stroke="#0B1220"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: checked ? 1 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        </motion.svg>
      </span>
      <span className="transition-colors group-hover:text-rain">{label}</span>
    </label>
  );
}
