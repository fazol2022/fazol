import React, { useContext, useEffect, useState } from 'react';
import { HeaderWrapper } from './styles';
import Drawer from 'minimal-components-react/dist/components/Drawer';
import List from 'minimal-components-react/dist/components/List';
import dynamic from 'next/dynamic';
// import { HostContext } from '../../contexts/host/context';
import { withTheme } from 'styled-components';
import { LanguageContext } from '../../contexts/language/context';
import NotificationContext from '../../contexts/notification/context';
import Notification from 'minimal-components-react/dist/components/Notification';
import { default as lightTheme } from '../../styles/themes/light.json';
import { FixedLink, Text } from 'minimal-components-react/dist/components/Text';
import { default as map } from '../../maps/map.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IconModel from '../../models/iconModel';
import { CartContext } from '../../contexts/cart/context';
import { getPaths, notInPages } from 'minimal-components-react/dist/utils/path';
import {
  BasicItemHolder,
  IconItem,
  ItemHolder,
} from 'minimal-components-react/dist/components/Drawer/styles';
import { MenuContext } from '../../contexts/menu/context';
const Scroll = dynamic(
  () => import('minimal-components-react/dist/components/ScrollToSection'),
  {
    ssr: false,
  }
);
// import Scroll from "../../components/Scroll";

const Header = (props: { title; setTitle; theme? }) => {
  const menu = useContext(MenuContext);
  const navigate = useNavigate();
  const location = useLocation();
  const language = useContext(LanguageContext);
  const [navItems, _setNavItems] = useState<IconModel[]>([]);

  const { quantity } = useContext(CartContext);

  const getLogoLight = () => {
    return '/img/logo.svg';
  };

  const getLogoDark = () => {
    return '/img/logoInvert.svg';
  };

  const getAddLight = () => {
    return '/img/addPerson.svg';
  };

  const getAddDark = () => {
    return '/img/addPersonInvert.svg';
  };

  const getFilterLight = () => {
    return '/img/filter.svg';
  };

  const getFilterDark = () => {
    return '/img/filterInvert.svg';
  };

  const getBackLight = () => {
    return '/img/left.svg';
  };

  const getBackDark = () => {
    return '/img/leftInvert.svg';
  };

  const [logoLight] = useState(getLogoLight());
  const [logoDark] = useState(getLogoDark());
  const [logo, setLogo] = useState(logoLight);

  const [addLight] = useState(getAddLight());
  const [addDark] = useState(getAddDark());
  const [add, setAdd] = useState(addLight);

  const [filterLight] = useState(getFilterLight());
  const [filterDark] = useState(getFilterDark());
  const [filter, setFilter] = useState(filterLight);

  const [backLight] = useState(getBackLight());
  const [backDark] = useState(getBackDark());
  const [back, setBack] = useState(backLight);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    const logo =
      props.theme !== lightTheme || menu?.menu === 2 ? logoDark : logoLight;
    setLogo(logo);
  }, [logo, logoDark, props.theme]);

  useEffect(() => {
    const add =
      props.theme !== lightTheme || menu?.menu === 2 ? addDark : addLight;
    setAdd(add);
  }, [add, addDark, props.theme]);

  useEffect(() => {
    const filter =
      props.theme !== lightTheme || menu?.menu === 2 ? filterDark : filterLight;
    setFilter(filter);
  }, [filter, filterDark, props.theme]);

  useEffect(() => {
    const back =
      props.theme !== lightTheme || menu?.menu === 2 ? backDark : backLight;
    setBack(back);
  }, [back, backDark, props.theme]);

  useEffect(() => {}, [logo]);

  useEffect(() => {}, [quantity]);

  useEffect(() => {}, [navItems]);

  useEffect(() => {}, [props?.title, props?.setTitle]);

  useEffect(() => {
    const names = location?.pathname?.split('/');
    let name = names[names.length - 1];
    name = language?.nav[name] || name;
    let currentPage = Object.keys(language?.pages || {}).find(
      (key) => language?.pages[key] === location.pathname
    );
    currentPage = currentPage ? language?.nav[currentPage] : undefined;
    currentPage = currentPage ? currentPage : name;
    currentPage = decodeURI(currentPage);
    props?.setTitle(currentPage);
  }, []);

  useEffect(() => {}, [props?.title, props?.setTitle]);

  const toggle = () => {
    const music = document.getElementById('music');
    if (play) {
      setPlay(false);
      music.pause();
    } else {
      setPlay(true);
      music.play();
    }
  };

  return (
    <>
      <audio id="music" src="/audio/nyanCat.mp3" loop>
        <source src="/audio/nyanCat.mp3" type="audio/mpeg" />
      </audio>
      <HeaderWrapper menu={menu?.menu}>
        <Drawer
          top={true}
          nav={
            <>
              <List>
                <ItemHolder>
                  <Text>FAZ O</Text>
                  <IconItem
                    size={'large'}
                    src={logo}
                    alt="invite"
                    style={{ margin: '5px 10px', height: '50px' }}
                  />
                </ItemHolder>
              </List>
              <List>
                <ItemHolder>
                  <Text>{props?.title || ''}</Text>
                </ItemHolder>
              </List>
              <List>
                <IconItem
                  size={'large'}
                  src={
                    play
                      ? '/img/nyan-cat-rainbow-reverse.gif'
                      : '/img/nyan-cat-rainbow-reverse.png'
                  }
                  alt="filter"
                  style={{ margin: '5px', height: '60px' }}
                  onClick={toggle}
                />
              </List>
            </>
          }
        ></Drawer>
        <Scroll map={map} />
        <Notification context={NotificationContext} />
      </HeaderWrapper>
    </>
  );
};
export default withTheme(Header);
