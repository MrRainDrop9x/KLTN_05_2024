/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'images.clerk.dev',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'www.gravatar.com',
          port: '',
        },
      ],
    },
    // experimental: {
    //   ppr: true,
    // },
  }
  
  module.exports = nextConfig
  