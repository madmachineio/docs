const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MadMachine Documentation',
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
      logo: {
        alt: 'MadMachine',
        src: 'img/logo_dark.svg',
        srcDark: 'img/logo_dark.svg',
        href: 'https://madmachine.io'
      },
      items: [
        {
          type: 'doc',
          docId: 'base/introduction',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'learn/learn1',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'doc',
          docId: 'library/swiftio',
          position: 'left',
          label: 'Library',
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
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
        href: 'https://madmachine.io'
      },
      links: [
        {
          title: 'Products',
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
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
