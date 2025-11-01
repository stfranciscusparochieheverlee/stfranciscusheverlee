const withSvgr = require("next-svgr");


module.exports = withSvgr({
  webpack: (config, { isServer }) => {
    return config
  },
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
    return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=3571000; includeSubDomains; preload',
            },
          ],
        },
      ];
  }
});
