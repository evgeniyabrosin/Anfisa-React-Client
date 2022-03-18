import { FC, useState } from 'react'
import styled from 'styled-components'

import { StatList } from '@declarations'
import { t } from '@i18n'
import { theme } from '@theme'
import { Icon } from '@ui/icon'
import { getNumberWithCommas } from '../../ui/next-step-route'
import chartStore from './chart.store'
import { getShortNumber } from './utils/getShortNumber'

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`
const LabelsWrapper = styled.div`
  color: ${theme('colors.white')};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 67%;
  margin-left: 16px;
`
const LabelRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
`
const LabelRowLeft = styled.div`
  display: flex;
  flex-direction: column;
`
const LabelRowLeftName = styled.div`
  display: flex;
  align-items: center;
`
const StyledIcon = styled(Icon)<{ color: string | undefined }>`
  margin-right: 8px;
  color: ${({ color }) => color};
`
const LabelQuantity = styled.span`
  color: ${theme('colors.grey.blue')};
`
const LabelRowRight = styled.div`
  display: flex;
  align-items: center;
`
const CollapseBtn = styled.span`
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: ${theme('colors.blue.bright')};
`
const Total = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${theme('colors.grey.blue')};
  line-height: 16px;
  position: relative;
  bottom: 70px;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const TotalValue = styled.span`
  color: ${theme('colors.white')};
  cursor: pointer;
`
const PieChartContainer = styled.div`
  height: 110px;
  width: 110px;
`

interface IPieChartProps {
  subGroupItem: StatList
  children: any
}

export const PieChartWrapper: FC<IPieChartProps> = ({
  subGroupItem,
  children,
}) => {
  const [isListCollapsed, setIsListCollapsed] = useState(true)
  const { variants } = subGroupItem

  const totalCountsOnChart = variants.reduce(
    (previousValue, variant) => previousValue + variant[1],
    0,
  )

  const filteredVariants = variants.sort(
    (firstVariant, secondVariant) => secondVariant[1] - firstVariant[1],
  )

  const labelsInCollapsedMode = 3
  const collapsedList = filteredVariants.slice(0, labelsInCollapsedMode)

  const variantList = isListCollapsed ? collapsedList : filteredVariants
  const shouldShowCollapseBtn = filteredVariants.length > labelsInCollapsedMode

  const { colorListForPieChart } = chartStore
  return (
    <MainWrapper>
      <LabelsWrapper>
        {variantList.map(([variantName, variantNumber], index) => {
          const optionPercentage = (
            (variantNumber / totalCountsOnChart) *
            100
          ).toFixed(2)

          return (
            <LabelRow key={variantName}>
              <LabelRowLeft>
                <LabelRowLeftName>
                  <StyledIcon
                    name="Circle"
                    color={
                      colorListForPieChart[index] ?? theme('colors.grey.blue')
                    }
                  />
                  {variantName}
                </LabelRowLeftName>

                <LabelQuantity>
                  {getNumberWithCommas(variantNumber) +
                    ' ' +
                    t('filter.chart.variants')}
                </LabelQuantity>
              </LabelRowLeft>
              <LabelRowRight> {optionPercentage}%</LabelRowRight>
            </LabelRow>
          )
        })}

        {shouldShowCollapseBtn && (
          <CollapseBtn onClick={() => setIsListCollapsed(!isListCollapsed)}>
            {isListCollapsed
              ? t('filter.chart.seeAll')
              : t('filter.chart.hide')}
          </CollapseBtn>
        )}
      </LabelsWrapper>

      <PieChartContainer>
        {children}
        <Total>
          <span>{t('filter.chart.total')}</span>
          <TotalValue>{getShortNumber(totalCountsOnChart)}</TotalValue>
        </Total>
      </PieChartContainer>
    </MainWrapper>
  )
}
