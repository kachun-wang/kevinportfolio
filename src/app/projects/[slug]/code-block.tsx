"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  description: string;
}

// Simple syntax highlighting for Python
function highlightPython(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    const tokens: ReactNode[] = [];
    let tokenIndex = 0;

    // Very simple tokenization (production would use a proper parser)
    const addToken = (text: string, className?: string) => {
      if (text) {
        tokens.push(
          <span key={`${lineIndex}-${tokenIndex++}`} className={className}>
            {text}
          </span>
        );
      }
    };

    // Check for comment
    const commentMatch = line.match(/#.*$/);
    if (commentMatch) {
      const beforeComment = line.slice(0, commentMatch.index);
      processLine(beforeComment);
      addToken(commentMatch[0], "text-white/40 italic");
    } else {
      processLine(line);
    }

    function processLine(text: string) {
      // Check for string
      const stringRegex =
        /("""[\s\S]*?"""|'''[\s\S]*?'''|f?"[^"]*"|f?'[^']*')/g;
      let lastIndex = 0;
      let match;

      while ((match = stringRegex.exec(text)) !== null) {
        // Add text before string
        if (match.index > lastIndex) {
          processNonString(text.slice(lastIndex, match.index));
        }
        // Add string
        addToken(match[0], "text-emerald-400");
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        processNonString(text.slice(lastIndex));
      }
    }

    function processNonString(text: string) {
      // Split by spaces and special chars while preserving them
      const parts = text.split(/(\s+|[()[\]{},.:=<>+\-*/])/);

      parts.forEach((part) => {
        if (!part) return;

        // Keywords
        if (
          /^(def|class|import|from|return|if|else|elif|for|while|try|except|with|as|async|await|None|True|False|self|yield|raise|pass|break|continue|lambda|in|not|and|or|is)$/.test(
            part
          )
        ) {
          addToken(part, "text-purple-400 font-semibold");
        }
        // Decorator
        else if (part.startsWith("@")) {
          addToken(part, "text-yellow-400");
        }
        // Types (capitalized)
        else if (/^[A-Z][a-zA-Z]*$/.test(part)) {
          addToken(part, "text-cyan-400");
        }
        // Numbers
        else if (/^\d+\.?\d*$/.test(part)) {
          addToken(part, "text-orange-400");
        }
        // Function names (before parenthesis) - would need context
        else if (/^\w+$/.test(part)) {
          addToken(part, "text-blue-300");
        }
        // Operators and punctuation
        else if (/^[()[\]{},.:=<>+\-*/]+$/.test(part)) {
          addToken(part, "text-white/60");
        }
        // Whitespace and others
        else {
          addToken(part, "text-white/80");
        }
      });
    }

    return (
      <div key={lineIndex} className="table-row hover:bg-white/5">
        <span className="table-cell w-12 select-none pr-4 text-right text-white/20">
          {lineIndex + 1}
        </span>
        <span className="table-cell whitespace-pre">{tokens}</span>
      </div>
    );
  });
}

export function CodeBlock({
  title,
  language,
  code,
  description,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Code2 className="h-4 w-4 text-purple-400" />
          <span className="font-medium text-white">{title}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all",
            copied
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Description */}
      <div className="border-b border-white/5 bg-white/5 px-4 py-3">
        <p className="text-sm text-white/60">{description}</p>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-4">
        <code className="table font-mono text-sm leading-relaxed">
          {highlightPython(code)}
        </code>
      </div>
    </motion.div>
  );
}
