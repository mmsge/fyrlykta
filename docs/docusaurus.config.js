// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fyrlykta',
  tagline: 'A public discovery engine for the independent web',
  url: 'https://mmsge.github.io',
  baseUrl: '/fyrlykta/',
  organizationName: 'mmsge',
  projectName: 'fyrlykta',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mmsge/fyrlykta/edit/main/docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Fyrlykta',
        items: [
          { type: 'docSidebar', sidebarId: 'docs', label: 'Docs', position: 'left' },
          { href: 'https://github.com/mmsge/fyrlykta', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Fyrlykta contributors. Licence not yet chosen.`,
      },
    }),
};

module.exports = config;
