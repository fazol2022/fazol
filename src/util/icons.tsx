/* eslint-disable react/prop-types */
import Quantity from 'minimal-components-react/dist/components/Text/Quantity';
import React from 'react';

const Svg = (props) => (
  <svg
    height="100%"
    viewBox="0 0 24 24"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

const SVG = (props) => (
  <svg
    height="100%"
    width="100%"
    viewBox="0 0 130 230"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

const SVG2 = (props) => (
  <svg
    height="100%"
    width="100%"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

export const MilkBar = ({
  min = 0,
  max = 1,
  fillColor = '#000000',
  time = 1,
  id = 0,
  styles = {},
  quantity = 1,
}) => (
  <div style={{ position: 'relative' }}>
    <SVG style={styles}>
      <linearGradient id={'lg' + id} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset={min} stopOpacity="1" stopColor={fillColor} />
        <stop offset={max} stopOpacity="1" stopColor={fillColor}>
          <animate
            attributeName="offset"
            from={min}
            to={max}
            dur={time + 's'}
            begin="0s"
          />
        </stop>
        <stop offset={max} stopOpacity="0" stopColor={fillColor}>
          <animate
            attributeName="offset"
            from={min}
            to={max}
            dur={time + 's'}
            begin="0s"
          />
        </stop>
        <stop offset={max} stopOpacity="0" stopColor={fillColor} />
      </linearGradient>

      <path
        d="M39.3416 2.5C39.3416 2.5 37.2794 3.42588 37.2794 4.37501C37.2794 5.32414 39.3416 6.25002 39.3416 6.25002L39.7924 31.0932L24.5471 46.93L5.40047 27.0422C5.40047 27.0422 3.94774 27.4803 3.43469 28.0128C2.92168 28.5453 2.5 30.055 2.5 30.055L21.6135 49.9439L6.40042 65.7804L6.85121 223.75C6.85121 223.75 4.78905 224.676 4.78905 225.625C4.78905 226.574 6.85121 227.5 6.85121 227.5L123.147 227.5C123.147 227.5 125.21 226.574 125.21 225.625C125.21 224.676 123.147 223.75 123.147 223.75L123.599 65.7804L108.384 49.9439L127.5 30.055C127.5 30.055 127.078 28.5453 126.566 28.0128C126.052 27.4793 124.597 27.0422 124.597 27.0422L105.453 46.93L90.2076 31.0932L90.6564 6.25002C90.6564 6.25002 92.7195 5.32414 92.7195 4.37501C92.7195 3.42588 90.6564 2.5 90.6564 2.5L39.3416 2.5Z"
        fill={'url(#lg' + id + ')'}
        fillRule="evenodd"
        opacity="1"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </SVG>
    <Quantity value={quantity} holderStyle={{ left: '22px', top: '-12px' }} />
  </div>
);

export const PacMan = ({ fillColor = '#000000', id = 0, styles = {} }) => (
  <SVG2 style={styles}>
    <path
      fill="none"
      d="m 16.15,33.838835 a 12.5,12.5 0 1 0 0,-17.67767"
      id={'p0-' + id}
      stroke={fillColor}
      strokeWidth={25}
    />

    <circle
      fillRule="evenodd"
      fill={fillColor}
      stroke="none"
      strokeMiterlimit={10}
      id={'c0-' + id}
      strokeWidth={1}
      cx="-12.5"
      cy="25"
      r="2.5"
      transform="scale(-1,1)"
    />

    <circle
      fillRule="evenodd"
      fill={fillColor}
      stroke="none"
      strokeMiterlimit={10}
      strokeWidth={1}
      id={'c2-' + id}
      cx="-2.5"
      cy="25"
      r="2.5"
      transform="scale(-1,1)"
    />
  </SVG2>
);

export const DeleteIcon = () => (
  <Svg>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
  </Svg>
);

export const MailIcon = () => (
  <Svg>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" />
  </Svg>
);

export const ReplyIcon = () => (
  <Svg>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
  </Svg>
);

export const ThumbUpIcon = () => (
  <Svg>
    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
    <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
  </Svg>
);

export const ThumbDownIcon = () => (
  <Svg>
    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
  </Svg>
);
