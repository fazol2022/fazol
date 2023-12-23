import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'minimal-components-react/dist/components/Text';
import { withTheme } from 'styled-components';
import { News } from './news';

const News = (props?: { theme?; news: News }) => {
  // const notification = useContext(NotificationContext);
  // const hostContext = useContext(HostContext);
  // const userContext = useContext(UserContext);

  return (
    <div
      style={{
        width: '100%',
        height: '75px',
        position: 'relative',
        border: `3px solid ${props?.theme?.primary}`,
        borderRadius: '7px',
        zIndex: 1,
      }}
    >
      <div
        onClick={()=>window.open(props?.news.link, '_blank')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            boxSizing: 'border-box',
          }}
        >
          <Text sizeType={'h1'} weightType={'bolder'}>
            {props?.news.title}
          </Text>
          <Text
            sizeType={'h3'}
            weightType={'bolder'}
            style={{ margin: '20px', textAlign: 'right' }}
          >
            {props?.news.date.toLocaleDateString('pt-BR')}
          </Text>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            justifyContent: 'right',
            zIndex: -1,
            // background: props?.theme?.background,
            display: 'flex',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={'/logos/globo.svg'}
            style={{
              // mixBlendMode: 'difference',
              filter: 'grayscale(100%) contrast(200%)',
              opacity: 0.25,
              // width: '100%',
              height: '100%',
              padding: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withTheme(News);
