"use client";

import { useEffect, useState } from "react";

export function useTypewriter(words: string[], options?: { typingMs?: number; deletingMs?: number; pauseMs?: number }) {
  const typingMs = options?.typingMs ?? 70;
  const deletingMs = options?.deletingMs ?? 40;
  const pauseMs = options?.pauseMs ?? 1600;

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingMs);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingMs);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingMs, deletingMs, pauseMs]);

  return text;
}
