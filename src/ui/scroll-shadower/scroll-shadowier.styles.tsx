import styled from 'styled-components'

export const Container = styled.div`
  height: fit-content;
  width: fit-content;
  overflow: auto;
`

export const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const ShadowTop = styled.div`
  z-index: 60;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.25)
  );
`

export const ShadowBottom = styled.div`
  z-index: 60;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.25)
  );
`

export const ShadowLeft = styled.div`
  z-index: 60;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 20px;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.25)
  );
`

export const ShadowRight = styled.div`
  z-index: 60;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 20px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.25)
  );
`
