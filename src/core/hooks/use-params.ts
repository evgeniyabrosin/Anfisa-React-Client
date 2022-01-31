import { useLocation } from 'react-router-dom'

export const useParams = (): URLSearchParams =>
  new URLSearchParams(useLocation().search)
