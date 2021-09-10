import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { QueryBuilderSearch } from '../query-builder-search'
import { QueryBuilderSubgroup } from '../query-builder-subgroup'

const ModalContainer = styled.div`
  display: block;
`

const ModalView = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  opacity: 0.7;
`

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 580px;
  height: 340px;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  z-index: 1000;
`

export const ModalSelectAttribute = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getQueryBuilder)

    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalAttribute())

    return (
      <ModalContainer>
        <ModalView className="bg-grey-blue" />

        <ModalContent ref={ref} className="py-4 px-4">
          <div className="flex w-full justify-between items-center font-medium mb-3">
            <div>{t('dtree.selectAnAttribute')}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={() => dtreeStore.closeModalAttribute()}
            />
          </div>

          <div className="flex w-full">
            <QueryBuilderSearch
              value={dtreeStore.searchFieldFilterList}
              onChange={dtreeStore.addSearchFieldFilterList}
              isModal
            />
          </div>

          <div className="overflow-y-scroll h-5/6 pt-3">
            {groupNames.map((groupName, index) => (
              <QueryBuilderSubgroup
                groupName={groupName}
                index={index}
                key={groupName}
                changeIndicator={dtreeStore.filterChangeIndicator}
                isContentExpanded={dtreeStore.isFilterContentExpanded}
                isModal
              />
            ))}
          </div>
        </ModalContent>
      </ModalContainer>
    )
  },
)
