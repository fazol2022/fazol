'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
// @ts-ignore
import { Text } from 'minimal-components-react/dist/components/Text';
// import NotificationContext from '../../notification/context';
// import LoadingBag from '../LoadingBag';
// import axios from 'axios';
// @ts-ignore
import Input from 'minimal-components-react/dist/components/Input';
// import { HostContext } from '../../contexts/host/context';
// import { UserContext } from '../../contexts/user/context';
import Loading from '../Loading';
import { withTheme } from 'styled-components';
import News from '../News';
import List from 'minimal-components-react/dist/components/List';
import { getNews } from '../../app/actions';

const Home = (props?: { navigate?; search?: string; setSearch? }) => {
  // const notification = useContext(NotificationContext);
  // const hostContext = useContext(HostContext);
  // const userContext = useContext(UserContext);
  // @ts-ignore
  const language = useContext(LanguageContext);
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((response) => {
        setNews(response);
        setLoading(false);
        console.log('news', news);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // console.log('props', props);

  return (
    /* @ts-ignore */
    <Loading loading={loading}>
      <List vertical search={props?.search} setSearch={props?.setSearch}>
        {/* <News
          // @ts-ignore
          news={{
            title: 'JHFLSDKJFHLDS',
            date: new Date(),
            link: 'https://google.com',
            icon: '/logos/globo.svg',
          }}
        /> */}
        {news.map((news, i) => (
          <News
            key={i}
            // @ts-ignore
            news={news}
          />
        ))}
      </List>
    </Loading>
  );
};

export default withTheme(Home);
