import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// On-brand Markdown rendering for researched article bodies.
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: (props) => <h3 className="mt-8 mb-3 text-xl font-bold text-foreground" {...props} />,
        h3: (props) => <h4 className="mt-6 mb-2 text-lg font-semibold text-foreground" {...props} />,
        p: (props) => <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />,
        a: (props) => (
          <a
            className="text-gold underline underline-offset-2 transition-colors hover:text-gold-strong"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        ul: (props) => <ul className="mb-4 ml-5 list-disc space-y-1.5 text-muted-foreground" {...props} />,
        ol: (props) => <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-muted-foreground" {...props} />,
        li: (props) => <li className="leading-relaxed" {...props} />,
        strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
        em: (props) => <em className="italic" {...props} />,
        blockquote: (props) => (
          <blockquote className="mb-4 border-l-2 border-gold/50 pl-4 italic text-muted-foreground" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
