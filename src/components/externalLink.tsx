import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
  href: string;
};

export const ExternalLink: React.FC<Props> = (props: Props) => {
  return (
    <a className={props.className} href={props.href} target='_blank' rel='noopener noreferrer'>{props.children}</a>
  );
};
