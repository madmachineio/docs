/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
//import IconExternalLink from '@theme/IconExternalLink';

import {
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaYoutube} from 'react-icons/fa';


function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({sources, alt}) => (
  <ThemedImage className="footer__logo" alt={alt} sources={sources} />
);

const Subscribe = () => {
  return (
    <form action="https://madmachine.us5.list-manage.com/subscribe/post?u=18fbea2e6fe4ec584193b92db&amp;id=545deb9dde" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>
      <div aria-hidden="true" className="footer--subscribe--fake">
        <input type="text" name="b_18fbea2e6fe4ec584193b92db_545deb9dde" tabindex="-1" value="" />
      </div>
      <input type="email" name="EMAIL" placeholder="Enter Your Email Address" className="footer--subscribe" />
      <input type="submit" value="Subscribe" name="subscribe" className="footer--subscribe--button" />
    </form>
  );
}


function Footer() {
  const {footer} = useThemeConfig();
  const {links = [], logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="container">
        <div className="row footer__links">

          <div className="col footer__col">
            <ul className="footer__items clean-list">
              <li className="footer__item">
                {logo.href ? (
                    <Link href={logo.href} className={styles.footerLogoLink}>
                      <FooterLogo alt={logo.alt} sources={sources} />
                    </Link>
                  ) : (
                    <FooterLogo alt={logo.alt} sources={sources} />
                  )}
              </li>
              <li className="footer__item">
                    <Link href='mailto:info@madmachine.io' className="footer__link-item">
                      info@madmachine.io
                    </Link>
              </li>
              <li className="footer__item">
              © {new Date().getFullYear()}, All Rights Reserved. 
              </li>
            </ul>
          </div>

          {links && links.length > 0 && (
            links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <div className="footer__title">{linkItem.title}</div>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items clean-list">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </div>
            ))
          )}

          <div className="col footer__col">
            <ul className="footer__items clean-list">
              <li className="footer__item">
                  <h2>Join us</h2>
              </li>
              <li className="footer__item">
                <Subscribe />
              </li>
              <li className="footer__item">
                <div>
                  <Link to="https://twitter.com/madmachineio" className="footer--community"><FaTwitter /></Link>
                  <Link to="https://madmachine.io/discord" className="footer--community"><FaDiscord /></Link>
                  <Link to="https://github.com/madmachineio" className="footer--community"><FaGithub /></Link>
                  <Link to="https://youtube.com/madmachineio" className="footer--community"><FaYoutube /></Link>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}


export default Footer;
