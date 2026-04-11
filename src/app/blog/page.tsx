import Navigation from "@/components/Navigation";
import { posts, type Post } from "@/lib/posts";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{
    fontSize: '1.8rem',
    marginBottom: '2.5rem',
    textAlign: 'center',
    position: 'relative',
    color: 'var(--text-primary)',
    fontWeight: 500,
    fontFamily: 'var(--font-serif)',
  }}>
    {title}
    <span style={{
      display: 'block',
      width: '40px',
      height: '2px',
      background: 'var(--machine-accent)',
      margin: '1rem auto 0',
      opacity: 0.6,
    }} />
  </h2>
);

const PostCard = ({ post }: { post: Post }) => {
  const innerContent = (
    <article style={{
      padding: '2rem',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--bg-alt)',
      transition: 'all 0.5s ease-in-out',
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '0.5rem',
        marginBottom: '1rem',
      }}>
        {post.tags.map((tag) => (
          <code key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            borderRadius: '2px',
          }}>{tag}</code>
        ))}
      </div>
      <h3 style={{
        fontSize: '1.3rem',
        fontWeight: 600,
        margin: '0 0 0.75rem',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-serif)',
        lineHeight: 1.3,
      }}>
        {post.title}
      </h3>
      <p style={{
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        marginBottom: '1.25rem',
        lineHeight: 1.65,
      }}>
        {post.excerpt}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '0.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.04em',
      }}>
        <span>{post.publishedAt}</span>
        <span>{post.readMinutes} min · {post.views} views</span>
      </div>
      {!post.externalUrl && (
        <div style={{
          marginTop: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--machine-accent)',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
        }}>
          Coming soon
        </div>
      )}
    </article>
  );

  if (post.externalUrl) {
    return (
      <a
        href={post.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        {innerContent}
      </a>
    );
  }
  return innerContent;
};

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navigation />
      <section style={{ padding: '8rem 0 5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <SectionTitle title="Writing" />
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1rem',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
          }}>
            Notes on DeFi, blockchain, digital identity, and the slow collision of finance with open networks.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}>
            {posts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
          <p style={{
            marginTop: '3rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          }}>
            More articles coming soon
          </p>
        </div>
      </section>
      <footer style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-alt)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          margin: 0,
        }}>
          © {new Date().getFullYear()} Dante Arola. Built with curiosity and too much coffee.
        </p>
      </footer>
    </main>
  );
}
