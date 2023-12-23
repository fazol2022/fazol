import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
import { Text } from 'minimal-components-react/dist/components/Text';
// import NotificationContext from '../../notification/context';
// import LoadingBag from '../LoadingBag';
// import axios from 'axios';
import Input from 'minimal-components-react/dist/components/Input';
// import { HostContext } from '../../contexts/host/context';
// import { UserContext } from '../../contexts/user/context';
import Loading from '../Loading';
import { withTheme } from 'styled-components';
import News from '../News';
import List from 'minimal-components-react/dist/components/List';

const Home = (props?: { navigate?; search?: string; setSearch? }) => {
  // const notification = useContext(NotificationContext);
  // const hostContext = useContext(HostContext);
  // const userContext = useContext(UserContext);
  const language = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);

  return (
    <Loading loading={loading}>
      <List vertical search={props?.search} setSearch={props?.setSearch}>
        <News
          news={{
            title: 'JHFLSDKJFHLDS',
            date: new Date(),
            link: 'https://google.com',
            icon: '/logos/globo.svg',
          }}
        />
      </List>
    </Loading>
  );
};

export default withTheme(Home);
