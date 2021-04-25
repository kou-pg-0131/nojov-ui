import React from 'react';
import loadable from '@loadable/component';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PrivacyPolicyItem, ExternalLink } from '../components';
const Layout = loadable(() => import('../layout'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      fontSize: 36,
      marginBottom: theme.spacing(4),
    },
  }),
);

const PrivacyPolicyPage: React.VFC = () => {
  const classes = useStyles();

  const items: { title: string; content: React.ReactNode; }[] = [
    {
      title: '免責事項',
      content: (
        <>
          当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </>
      ),
    },
    {
      title: 'アクセス解析ツールについて',
      content: (
        <>
          当サイトでは、 Google によるアクセス解析ツール「 Google アナリティクス」を利用しています。この Google アナリティクスはトラフィックデータの収集のために Cookie を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は Cookie を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは <ExternalLink href="https://www.google.com/analytics/terms/jp.html">https://www.google.com/analytics/terms/jp.html</ExternalLink> を参照してください。
        </>
      ),
    },
    {
      title: 'プライバシーポリシーの変更について',
      content: (
        <>
          当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        </>
      ),
    },
  ];

  return (
    <Layout title='プライバシーポリシー'>
      <Typography variant='h2' className={classes.pageTitle}>プライバシーポリシー</Typography>

      {items.map(item => (
        <PrivacyPolicyItem key={item.title} title={item.title}>
          {item.content}
        </PrivacyPolicyItem>
      ))}

    </Layout>
  );
};

export default PrivacyPolicyPage;
