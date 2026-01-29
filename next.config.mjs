/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseOrigin = "https://*.supabase.co";
try {
  if (supabaseUrl) supabaseOrigin = new URL(supabaseUrl).origin;
} catch {
  // keep wildcard fallback
}

const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  `connect-src 'self' ${supabaseOrigin} https://*.supabase.co`,
  "font-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'self'"
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: csp }
      ]
    }
  ]
};

export default nextConfig;
