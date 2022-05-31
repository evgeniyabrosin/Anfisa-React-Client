import { t } from '@i18n'
import { Switch } from '@ui/switch'

interface IProps {
  handleChangeTheme: () => void
  theme?: string
}

export const SwitchTheme = ({ handleChangeTheme, theme }: IProps) => (
  <div className="flex items-center ml-2 text-14 font-thin">
    <Switch isChecked={theme === 'dark'} onChange={handleChangeTheme} />

    <span className="ml-1">{t('dtree.darkMode')}</span>
  </div>
)
