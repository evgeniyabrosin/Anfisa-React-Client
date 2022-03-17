import { FC, useState } from 'react'
import styled from 'styled-components'

import { StatList } from '@declarations'
import { t } from '@i18n'
import { theme } from '@theme'
import { Icon } from '@ui/icon'
import chartStore from './chart.store'

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  align-items: center;
`
const StyledIcon = styled(Icon)<{ color: string | undefined }>`
  margin-right: 8px;
  color: ${({ color }) => color};
`
const LabelQuantity = styled.span`
  color: ${theme('colors.grey.blue')};
`
const CollapseBtn = styled.span`
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: ${theme('colors.blue.bright')};
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

  const labelsInCollapsedMode = 4
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
                <StyledIcon name="Circle" color={colorListForPieChart[index]} />
                {variantName}{' '}
                <LabelQuantity>
                  ({variantNumber}/{totalCountsOnChart})
                </LabelQuantity>
              </LabelRowLeft>
              <div> {optionPercentage}%</div>
            </LabelRow>
          )
        })}

        {shouldShowCollapseBtn && (
          <CollapseBtn onClick={() => setIsListCollapsed(!isListCollapsed)}>
            {isListCollapsed
              ? t('filter.chart.seeAll')
              : t('filter.chart.collapse')}
          </CollapseBtn>
        )}
      </LabelsWrapper>

      <div style={{ width: '33%', height: 110 }}>{children}</div>
    </MainWrapper>
  )
}
