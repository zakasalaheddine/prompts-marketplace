'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

const DashboardContext = createContext<{
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}>({
  isLoading: false,
  setIsLoading: function (value: SetStateAction<boolean>): void {
    throw new Error('Function not implemented.')
  }
})

export const DashboardContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <DashboardContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () =>
  useContext<{
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
  }>(DashboardContext)
