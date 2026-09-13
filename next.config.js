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
      {
        source: "/pictures/:match*",
        destination: "https://photos.stfranciscus-heverlee.org/:match*"
      }
    ]  
  },
  async headers() {
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
        headers
      },
    ];
  }
});
