import styled from 'styled-components'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div<{ minHeight: number }>`
  width: 580px;
  height: auto;
  min-height: ${props => props.minHeight};
`

interface IProps {
  children: any
  minHeight: number
  refer: any
}

export const ModalBase = ({ minHeight, refer, children }: IProps) => (
  <ModalView className="bg-grey-blue">
    <ModalContent
      ref={refer}
      className="flex flex-col justify-between py-4 px-4 bg-white rounded-lg"
      minHeight={minHeight}
    >
      {children}
    </ModalContent>
  </ModalView>
)
