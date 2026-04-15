import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// ✅ đúng cách
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// Use throughout your app instead of plain `useDispatch` and `useSelector` - version new

// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from './store'
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()