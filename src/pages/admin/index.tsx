import { NextPage, NextPageContext } from 'next';
import router from 'next/router';

const IndexPage: NextPage = () => {
  return null;
};

IndexPage.displayName = 'IndexPage';

IndexPage.getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, { Location: '/admin/settings' }).end();
  } else {
    router.push('/admin/settings');
  }
  return { pageProps: {} };
};

export default IndexPage;
