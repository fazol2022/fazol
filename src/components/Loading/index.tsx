// import NotificationContext from '../../notification/context';
import React, { useEffect } from 'react';
import {
  Hitting,
  Falling,
} from 'minimal-components-react/dist/components/Loading/Animation/styles';
import { IconItem } from 'minimal-components-react/dist/components/Drawer/styles';
import Animation from 'minimal-components-react/dist/components/Loading/Animation';
import { default as darkTheme } from '../../styles/themes/dark.json';
import { withTheme } from 'styled-components';

const Loading = (props: {
  children?;
  theme?;
  loading?: boolean;
  progress?;
  progress2?;
}) => {
  useEffect(() => {}, [props?.loading]);
  return (
    <>
      {props?.loading ? (
        <>
          <div
            style={{
              display: 'block',
              justifyContent: 'center',
              position: 'relative',
              width: '200px',
              margin: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                width: '100px',
                margin: 'auto',
              }}
            >
              <Animation
                style={{ margin: 0, padding: 0, position: 'absolute', left: 0 }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/water.svg'
                      : '/img/type/waterInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{ margin: 0, padding: 0, position: 'absolute', left: 0 }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.15}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/carrot.svg'
                      : '/img/type/carrotInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{ margin: 0, padding: 0, position: 'absolute', left: 0 }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.5}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/wine.svg'
                      : '/img/type/wineInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 27,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.05}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/milk.svg'
                      : '/img/type/milkInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 20,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.2}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/bread.svg'
                      : '/img/type/breadInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 20,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.35}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/cow.svg'
                      : '/img/type/cowInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 50,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.3333}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/egg.svg'
                      : '/img/type/eggInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 50,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.1666}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/cheese.svg'
                      : '/img/type/cheeseInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 50,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.5}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/fish.svg'
                      : '/img/type/fishInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 75,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.25}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/cherry.svg'
                      : '/img/type/cherryInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 75,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.4}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/chicken.svg'
                      : '/img/type/chickenInvert.svg'
                  }
                />
              </Animation>
              <Animation
                style={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  left: 75,
                }}
                Animation={Falling}
                from={'-20px'}
                to={'180px'}
                blur={'1px'}
                scale={{ x: 0.75, y: 2 }}
                delay={0.55}
                duration={0.5}
              >
                <IconItem
                  style={{ margin: 0, padding: 0 }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/type/pig.svg'
                      : '/img/type/pigInvert.svg'
                  }
                />
              </Animation>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                width: '200px',
                margin: 'auto',
                marginTop: '125px',
                zIndex: 1,
              }}
            >
              <Animation Animation={Hitting}>
                <IconItem
                  style={{ height: '100px' }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/cart.svg'
                      : '/img/cartInvert.svg'
                  }
                />
              </Animation>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                width: '200px',
                height: '100px',
                margin: 'auto',
                top: '194px',
                background: props.theme.background,
              }}
            ></div>
          </div>
        </>
      ) : (
        <>{props?.children}</>
      )}
    </>
  );
};

export default withTheme(Loading);
