// import NotificationContext from '../../notification/context';
import React, { useEffect } from 'react';
import { Hitting } from 'minimal-components-react/dist/components/Loading/Animation/styles';
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
                width: '200px',
                margin: 'auto',
                zIndex: 1,
              }}
            >
              <Animation Animation={Hitting}>
                <IconItem
                  style={{ height: '100px' }}
                  src={
                    props.theme !== darkTheme
                      ? '/img/fazOL.svg'
                      : '/img/fazOL.svg'
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
