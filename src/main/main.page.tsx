import { ReactElement } from 'react'
import {t } from '../i18n/i18n'

export const MainPage = (): ReactElement => {
	return (
		<h2>{t('hello')}</h2>
	)
}