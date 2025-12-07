// components/ConverterClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { convert } from "@/conversions/conversions";

type Props = {
  defaultCategory: string;
  defaultFrom: string;
  defaultTo: string;
  unitsChunk: any;
};

export default function ConverterClient({
  defaultCategory,
  defaultFrom,
  defaultTo,
  unitsChunk,
}: Props) {
  const keys = Object.keys(unitsChunk.units);
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>(defaultFrom ?? keys[0]);
  const [to, setTo] = useState<string>(defaultTo ?? keys[1] ?? keys[0]);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    try {
      const r = convert(defaultCategory, from, to, Number(amount));
      setResult(r);
    } catch {
      setResult(null);
    }
  }, [defaultCategory, from, to, amount]);

  const formatted = useMemo(() => {
    if (result === null || Number.isNaN(result)) return "—";
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 8,
    }).format(result);
  }, [result]);

  // update URL shallowly (so the page is shareable/bookmarkable)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const newUrl = `/convert/${defaultCategory}/${from}-to-${to}?value=${amount}`;
    window.history.replaceState(null, "", newUrl);
  }, [defaultCategory, from, to, amount]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            className="mt-1 block w-full rounded border px-3 py-2"
            aria-label="Amount to convert"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block w-full"
          >
            {keys.map((k) => (
              <option key={k} value={k}>
                {k.replace(/_/g, " ")}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-2">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block w-full"
          >
            {keys.map((k) => (
              <option key={k} value={k}>
                {k.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-500">Result</div>
        <div className="text-xl font-mono mt-2">
          {formatted} {to}
        </div>
      </div>
    </div>
  );
}
