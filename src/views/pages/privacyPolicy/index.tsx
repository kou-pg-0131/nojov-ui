import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    pageTitle: {
      fontSize: 36,
    },
    item: {
      marginTop: 20,
    },
    title: {
      borderBottom: `2px solid #333`,
      fontSize: 28,
      marginBottom: 8,
    },
    text: {
      wordBreak: 'break-all',
    },
  })
);

export const PrivacyPolicyPage: React.FC = () => {
  const classes = useStyles();

  const items = [
    {
      title: '免責事項',
      text: '当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。'
    },
    {
      title: 'アクセス解析ツールについて',
      text: '当サイトでは、 Google によるアクセス解析ツール「 Google アナリティクス」を利用しています。この Google アナリティクスはトラフィックデータの収集のために Cookie を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は Cookie を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは <a href="https://www.google.com/analytics/terms/jp.html" target="_blank" rel="noopener">https://www.google.com/analytics/terms/jp.html</a> を参照してください。'
    },
    {
      title: 'プライバシーポリシーの変更について',
      text: '当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。'
    }
  ];

  return (
    <Box>
      <Typography variant='h2' className={classes.pageTitle}>プライバシーポリシー</Typography>
      {items.map(item =>
        <Box className={classes.item}>
          <Typography variant='h3' className={classes.title}>{item.title}</Typography>
          <Typography dangerouslySetInnerHTML={{ __html: item.text }} className={classes.text}></Typography>
        </Box>
      )}
    </Box>
  );
};
