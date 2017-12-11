import React from 'react';
import classNames from 'classnames';
import styles from './GlobalFooter.less';

export default ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className={styles.links}>
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      <div className={styles.copyright}>底部</div>
    </div>
  );
};
