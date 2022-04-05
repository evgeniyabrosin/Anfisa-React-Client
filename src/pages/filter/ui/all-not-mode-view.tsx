import { ReactElement } from 'react'

interface AllNotModeViewProps {
  isAllMode: boolean
  isNotMode: boolean
}

export const AllNotModeView = ({
  isAllMode,
  isNotMode,
}: AllNotModeViewProps): ReactElement => (
  <>
    {isAllMode && (
      <span className="ml-1 px-1 text-10 bg-green-medium  text-green-secondary rounded-sm">
        all
      </span>
    )}

    {isNotMode && (
      <span className="ml-1 px-1 text-10 bg-red-lighter  text-red-secondary rounded-sm ">
        not
      </span>
    )}
  </>
)
