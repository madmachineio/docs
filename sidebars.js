/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  
  docsSidebar: [
    'base/introduction', 
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'base/getting-started/step-by-step',
      ],
    },
    {
      type: 'category',
      label: 'Boards',
      items: [
        'base/boards/swiftio-board',
        'base/boards/swiftio-feather',
      ],
    },
    {
      type: 'category',
      label: 'Quick Guide',
      items: [
        'base/guide/use-ide',
      ],
    },
    'base/faq', 
  ],

  learnSidebar: [
    'learn/learn1',
  ],

  libarySidebar: [
    'library/swiftio',
  ],
};