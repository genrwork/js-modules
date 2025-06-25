import type { NextConfig } from 'next'
import { NodePackageImporter } from 'sass-embedded'
import withDisableNextJsGlobalCss from './helpers/withDisableNextJsGlobalCss.mjs'

const nextConfig: NextConfig = withDisableNextJsGlobalCss({
  /* config options here */
  sassOptions: {
    pkgImporter: new NodePackageImporter(),
    implementation: 'sass-embedded'
  },
  transpilePackages: ['@a4smanjorg5/invoida-components'],
  reactStrictMode: true,
});

export default nextConfig
