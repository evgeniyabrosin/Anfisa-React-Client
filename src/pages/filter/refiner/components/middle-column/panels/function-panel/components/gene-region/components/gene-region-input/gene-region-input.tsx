import styles from './gene-region-input.module.css'

import { FC } from 'react'
import cn, { Argument } from 'classnames'

interface IGeneRegionInputProp {
  value: string
  handleChange: (e: string) => void
  error: string
  classname?: Argument
}

export const GeneRegionInput: FC<IGeneRegionInputProp> = ({
  value,
  handleChange,
  error,
  classname,
}) => {
  return (
    <div className={cn(styles.container, classname)}>
      <input
        type="text"
        value={value}
        onChange={e => {
          handleChange(e.target.value)
        }}
        className={styles.input}
      />

      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
