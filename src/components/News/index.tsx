/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { Text } from 'minimal-components-react/dist/components/Text';
import { withTheme } from 'styled-components';
import { News } from './news';
import { Headline } from './styles';

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
        onClick={() => window.open(props?.news.link, '_blank')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Headline>
          <div className="title">
            <Text
              sizeType={'h1'}
              weightType={'bolder'}
              style={{
                textOverflow: 'ellipsis',
                display: 'inline-block',
                // set width to 100% but in pixels to make overflow work
                width: 'calc(100%)',
                maxHeight: '50px',
                overflow: 'hidden',
              }}
            >
              {props?.news.title}
            </Text>
          </div>
          <Text
            className="date"
            sizeType={'h3'}
            weightType={'bolder'}
            style={{
              margin: '20px',
              textAlign: 'right',
              width: '270px',
              textOverflow: 'ellipsis',
            }}
          >
            {(props?.news?.date as any)?.toLocaleDateString
              ? (props?.news?.date as any)?.toLocaleDateString('pt-BR')
              : props?.news?.date}
          </Text>
        </Headline>
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
            src={
              props?.news?.icon ||
              (props?.news?.portalId
                ? '/logos/' + props?.news?.portalId + '.svg'
                : '/logos/globo.svg')
            }
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
