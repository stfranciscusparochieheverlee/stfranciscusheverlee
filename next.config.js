const withSvgr = require("next-svgr");


module.exports = withSvgr({
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        source: "/viewer/:match*",
        destination: "https://viewer.stfranciscus-heverlee.org/:match*"
      },
      {
        source: "/assets/:match*",
        destination: "https://assets.tina.io/:match*"
      },
    ]  
  },
  async headers() {
    // these are also defined in the root layout since github pages doesn't support headers
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  }
});
