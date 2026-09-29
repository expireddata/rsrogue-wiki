import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders markdown. `inline` drops the paragraph wrapper, for a line inside a list or card. */
export default function Md({ children, inline }: { children: string; inline?: boolean }) {
  if (inline) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <>{children}</> }}>
        {children}
      </ReactMarkdown>
    );
  }
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
