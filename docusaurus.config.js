const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MadMachine',
  tagline: 'MadMachine Documentation',
  url: 'https://docs.madmachine.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MadMachine', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
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
          docId: 'how-to/create-new-project',
          position: 'left',
          label: 'How-to',
        },
        {
          type: 'doc',
          docId: 'learn/overview',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'doc',
          docId: 'tutorials/overview',
          position: 'left',
          label: 'Tutorials',
        },
        {
          type: 'doc',
          docId: 'reference/reference',
          position: 'left',
          label: 'References',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/madmachineio/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'MadMachine',
        src: 'img/logo_dark.svg',
        href: 'https://madmachine.io'
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
              href: 'https://madmachine.io/blog',
            },
            {
              label: 'Products',
              href: 'https://madmachine.io/products',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Boards',
              href: 'https://madmachine.io/discord',
            },
            {
              label: 'Kits',
              href: 'https://twitter.com/madmachineio',
            },
            {
              label: 'Modules',
              href: 'https://twitter.com/madmachineio',
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
    gtag: {
      // You can also use your "G-" Measurement ID here.
      trackingID: 'G-8H7H6DLEJ5',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Roboto:400,400i,700',
    'https://fonts.googleapis.com/css?family=Source+Code+Pro',
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/madmachineio/docs/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
