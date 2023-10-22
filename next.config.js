/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['i.dummyjson.com']
  }
};

module.exports = nextConfig;
