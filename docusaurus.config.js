const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MadMachine',
  tagline: 'MadMachine Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.madmachine.io',
  baseUrl: '/',

  organizationName: 'MadMachine', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/madmachineio/docs/',
          routeBasePath: '/',
        },
        blog: {
          blogTitle: 'Docusaurus blog!',
          blogDescription: 'A Docusaurus powered blog!',
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          // You can also use your "G-" Measurement ID here.
          trackingID: 'G-8H7H6DLEJ5',
          // Optional fields.
          anonymizeIP: false, // Should IPs be anonymized?
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    navbar: {
      //title: 'Machine',
      style: 'dark',
      hideOnScroll: false,
      logo: {
        alt: 'MadMachine',
        src: 'img/logo_dark.svg',
        srcDark: 'img/logo_dark.svg',
        href: 'https://madmachine.io'
      },
      items: [
        {
          type: 'doc',
          docId: 'overview/introduction',
          position: 'left',
          label: 'Overview',
        },
        {
          type: 'doc',
          docId: 'learn/introduction',
          position: 'left',
          label: 'Learning Playground',
        },
        // {
        //   type: 'doc',
        //   docId: 'projects/overview',
        //   position: 'left',
        //   label: 'Projects',
        // },
        {
          type: 'doc',
          docId: 'hardware/swiftio-micro',
          position: 'left',
          label: 'Hardware',
        },
        {
          type: 'doc',
          docId: 'reference/reference',
          position: 'left',
          label: 'API Reference',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/madmachineio/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'MadMachine',
        src: 'img/logo_dark.png',
        href: 'https://madmachine.io',
        width: 100,
        height: 100,
      },
      links: [
        {
          title: 'Goto',
          items: [
            {
              label: 'Home',
              href: 'https://madmachine.io',
            },
            {
              label: 'Blog',
              href: 'https://docs.madmachine.io/blog',
            }
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Community',
              href: 'https://madmachine.io/discord',
            },
          ],
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require("prism-react-renderer/themes/vsDark"),
      additionalLanguages: ['swift'],
    },
    algolia: {
      // If Algolia did not provide you any appId, use 'BH4D9OD16A'
      appId: '6R1F0BVDSY',

      // Public API key: it is safe to commit it
      apiKey: 'b30fc6d1e1a317e265f80464ff6433b9',

      indexName: 'docs-madmachine',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Algolia search parameters
      // searchParameters: {},
    },
  }),
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Roboto:400,400i,700',
    'https://fonts.googleapis.com/css?family=Source+Code+Pro',
  ],
};
