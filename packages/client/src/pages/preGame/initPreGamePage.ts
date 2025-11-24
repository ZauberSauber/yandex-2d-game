import type { PageInitArgs } from '@src/routes/types'

import { fetchLocationsThunk } from '@slices'

export const initPreGamePage = ({ dispatch }: PageInitArgs) => dispatch(fetchLocationsThunk());
