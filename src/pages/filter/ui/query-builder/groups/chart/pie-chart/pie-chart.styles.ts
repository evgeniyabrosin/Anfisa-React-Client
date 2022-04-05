import styled from 'styled-components'

import { theme } from '@theme'

export const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

export const ListWrapper = styled.div`
  width: 67%;
`

export const LabelsWrapper = styled.div<{ isListCollapsed: boolean }>`
  color: ${theme('colors.white')};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  max-height: ${({ isListCollapsed }) => (isListCollapsed ? '120px' : 'none')};
  overflow: hidden;
`

export const LabelRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
`

export const LabelRowLeft = styled.div`
  display: flex;
  align-items: center;
`

export const StyledIcon = styled.div<{ color: string | undefined }>`
  margin-right: 8px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  width: 5px;
  height: 5px;
`

export const LavelInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 165px;
  margin-right: 16px;
`

export const LabelQuantity = styled.span`
  color: ${theme('colors.grey.blue')};
  flex-wrap: nowrap;
`

export const LabelRowRight = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const CollapseBtn = styled.span`
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: ${theme('colors.blue.bright')};
`

export const Total = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 10px;
  font-weight: 500;
  color: ${theme('colors.grey.blue')};
  line-height: 16px;
  text-align: center;
  transform: translate(-50%, -50%);
`

export const TotalValue = styled.div`
  color: ${theme('colors.white')};
`

export const PieChartContainer = styled.div`
  position: relative;
  height: 110px;
  width: 110px;
  margin-left: 8px;
`
