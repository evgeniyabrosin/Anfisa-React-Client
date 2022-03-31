import { ReactElement, useState } from 'react'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { SvgChart } from '@components/svg-chart'
import { TPieChartData } from '../chart.interface'
import {
  CollapseBtn,
  LabelQuantity,
  LabelRow,
  LabelRowLeft,
  LabelRowLeftName,
  LabelRowRight,
  LabelsWrapper,
  MainWrapper,
  PieChartContainer,
  StyledIcon,
  Total,
  TotalValue,
} from './pie-chart.styles'
import {
  drawPieChart,
  getPieChartItemColor,
  getShortNumber,
} from './pie-chart.utils'

interface IPieChartProps {
  data: TPieChartData
}

const labelsInCollapsedMode = 3

export const PieChart = ({ data }: IPieChartProps): ReactElement | null => {
  const [isListCollapsed, setIsListCollapsed] = useState(true)

  const totalCountsOnChart = data.reduce(
    (previousValue, variant) => previousValue + variant[1],
    0,
  )
  const shouldShowCollapseBtn = data.length > labelsInCollapsedMode

  const variantList =
    shouldShowCollapseBtn && isListCollapsed
      ? data.slice(0, labelsInCollapsedMode)
      : data

  return (
    <MainWrapper>
      <LabelsWrapper>
        {variantList.map(([name, value], index) => {
          const optionPercentage = ((value / totalCountsOnChart) * 100).toFixed(
            2,
          )

          return (
            <LabelRow key={name}>
              <LabelRowLeft>
                <LabelRowLeftName>
                  <StyledIcon
                    name="Circle"
                    color={getPieChartItemColor(index)}
                  />
                  {name}
                </LabelRowLeftName>

                <LabelQuantity>
                  {t('filter.chart.variants', {
                    value: formatNumber(value),
                  })}
                </LabelQuantity>
              </LabelRowLeft>
              <LabelRowRight>{optionPercentage}%</LabelRowRight>
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
        <Total>
          <span>{t('filter.chart.total')}</span>
          <TotalValue>{getShortNumber(totalCountsOnChart)}</TotalValue>
        </Total>
        <SvgChart data={data} render={drawPieChart} />
      </PieChartContainer>
    </MainWrapper>
  )
}
