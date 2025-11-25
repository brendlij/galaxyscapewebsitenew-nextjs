"use client"

import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose-galaxy"
      components={{
        h1: ({ children }) => (
          <h1 className="mb-6 mt-8 font-serif text-3xl font-medium tracking-tight md:text-4xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-4 mt-8 font-serif text-2xl font-medium tracking-tight md:text-3xl">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-3 mt-6 font-serif text-xl font-medium tracking-tight md:text-2xl">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 font-serif text-lg leading-8 text-foreground/90">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 list-disc pl-6 font-serif text-lg leading-8">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 font-serif text-lg leading-8">{children}</ol>,
        li: ({ children }) => <li className="mb-2 text-foreground/90">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-2 border-accent pl-6 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isInline = !className
          if (isInline) {
            return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
          }
          return <code className="font-mono text-sm">{children}</code>
        },
        pre: ({ children }) => <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4">{children}</pre>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <span className="my-8 block">
            <Image src={src || ""} alt={alt || ""} width={1200} height={675} className="rounded-lg" />
          </span>
        ),
        hr: () => <hr className="my-8 border-border" />,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
