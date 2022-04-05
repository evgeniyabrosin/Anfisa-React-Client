import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'

export interface ILoaderProps {
  size: 'xl' | 'l' | 'm' | 's' | 'xs'
  color: 'default' | 'white'
}

const loaderSizes: Record<
  ILoaderProps['size'],
  Record<'fontSize' | 'width' | 'height' | 'margin', number>
> = {
  xl: {
    fontSize: 13,
    width: 25,
    height: 25,
    margin: 100,
  },
  l: {
    fontSize: 10,
    width: 20,
    height: 20,
    margin: 80,
  },
  m: {
    fontSize: 8,
    width: 15,
    height: 15,
    margin: 40,
  },
  s: {
    fontSize: 5,
    width: 10,
    height: 10,
    margin: 0,
  },
  xs: {
    fontSize: 2,
    width: 5,
    height: 5,
    margin: 0,
  },
}

const Root = styled.div<{ size: ILoaderProps['size'] }>`
  width: 100%;

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    ${({ size }) =>
      css`
        width: ${loaderSizes[size].width}px;
        height: ${loaderSizes[size].height}px;
      `}
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
  }
  .loader {
    ${({ size }) =>
      css`
        font-size: ${loaderSizes[size].fontSize}px;
        margin: ${loaderSizes[size].margin}px auto;
      `}
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 3.5em;
  }
  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`

export const Loader = ({
  size = 'l',
  color = 'default',
}: React.PropsWithChildren<Partial<ILoaderProps>>): ReactElement => {
  return (
    <Root size={size}>
      <div
        className={`loader ${
          color === 'default' ? 'text-blue-bright' : 'text-white'
        }`}
      >
        Loading...
      </div>
    </Root>
  )
}
