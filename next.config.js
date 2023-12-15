/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const { withContentlayer } = require('next-contentlayer');

module.exports = withNextIntl(withContentlayer({}));
