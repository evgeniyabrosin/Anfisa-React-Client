import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  width: string
  height: string
  color: string
}

const Container = styled.div<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  .scrollGradient {
    background-image: linear-gradient(
        to right,
        ${({ color }) => color},
        ${({ color }) => color}
      ),
      linear-gradient(
        to right,
        ${({ color }) => color},
        ${({ color }) => color}
      ),
      linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)),
      linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
    background-position: left center, right center, left center, right center;
    background-repeat: no-repeat;
    background-color: ${({ color }) => color};
    background-size: 100px 100%, 100px 100%, 30px 100%, 30px 100%;
    background-attachment: local, local, scroll, scroll;
  }
`

export const OverflowContainer: FC<Props> = ({ children, ...others }) => {
  return <Container {...others}>{children}</Container>
}
