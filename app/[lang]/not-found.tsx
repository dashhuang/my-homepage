import Link from "next/link";

// not-found 拿不到当前语言参数，所以双语展示
export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '0 5%',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, margin: 0 }}>404</h1>
      <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>页面不存在 · Page not found</p>
      <Link href="/" className="text-link">回到首页 · Back to home →</Link>
    </main>
  );
}
