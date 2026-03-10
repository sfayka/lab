import Link from "next/link"

const posts = [
  {
    title: "I Use Two AI Agents as My Design and Engineering Team — Here's the Workflow",
    date: "28 Feb, 2026",
    readTime: "12 min read",
    slug: "ai-agents-design-engineering-workflow",
    tag: "Essay",
    excerpt: "Most AI coding tools can generate a decent UI if you describe what you want. But ask one tool to do both — design and backend — and things fall apart fast."
  },
  {
    title: "Your AI Agent Can Code. It Can't Design. Here's How I Fixed That.",
    date: "14 Feb, 2026",
    readTime: "8 min read",
    slug: "ai-agent-cant-design",
    tag: "Essay",
    excerpt: "Knox Bot rebuilt an entire Next.js travel planning app in a few hours. Authentication worked. Database queries were clean. The UI looked like a rough draft."
  },
  {
    title: "Hardening OpenClaw for my 2nd Employee",
    date: "2 Feb, 2026",
    readTime: "6 min read",
    slug: "hardening-openclaw",
    tag: "Essay",
    excerpt: "I set up OpenClaw as an autonomous business agent. Here's how I secured it — and what I learned about agentic trust boundaries."
  },
  {
    title: "The MCP Server Experiment",
    date: "18 Jan, 2026",
    readTime: "15 min read",
    slug: "mcp-server-experiment",
    tag: "Experiment",
    excerpt: "We built an MCP server for a client's internal tooling. Here's what surprised us."
  },
  {
    title: "Why We Stopped Using RAG (For Now)",
    date: "5 Jan, 2026",
    readTime: "4 min read",
    slug: "stopped-using-rag",
    tag: "Essay",
    excerpt: "Retrieval-augmented generation is powerful, but it wasn't the right fit for our last three projects. Here's why."
  },
  {
    title: "Our Current AI Stack",
    date: "20 Dec, 2025",
    readTime: "18 min read",
    slug: "current-ai-stack",
    tag: "Now",
    excerpt: "The tools, models, and workflows we're using right now at Knox Analytics."
  },
]

export function PostList() {
  return (
    <section className="py-8">
      <div className="flex flex-col divide-y divide-border">
        {posts.map((post) => (
          <article key={post.slug} className="group py-7 first:pt-0">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-widest">
                  {post.tag}
                </span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <Link
          href="https://lab.knoxanalytics.com"
          className="text-xs font-medium text-primary hover:text-foreground transition-colors uppercase tracking-widest"
        >
          All Posts →
        </Link>
      </div>
    </section>
  )
}
