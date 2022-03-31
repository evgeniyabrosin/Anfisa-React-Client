import styled from 'styled-components'

import { theme } from '@theme'
import { Icon } from '@ui/icon'

export const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

export const LabelsWrapper = styled.div`
  color: ${theme('colors.white')};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 67%;
  margin-left: 16px;
`

export const LabelRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
`

export const LabelRowLeft = styled.div`
  display: flex;
  flex-direction: column;
`

export const LabelRowLeftName = styled.div`
  display: flex;
  align-items: center;
`

export const StyledIcon = styled(Icon)<{ color: string | undefined }>`
  margin-right: 8px;
  color: ${({ color }) => color};
`

export const LabelQuantity = styled.span`
  color: ${theme('colors.grey.blue')};
`

export const LabelRowRight = styled.div`
  display: flex;
  align-items: center;
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
