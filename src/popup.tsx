import { CountButton } from "~features/count-button"

import "~style.css"

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query"

import Weather from "~features/Weather"

// Create a client
const queryClient = new QueryClient()

function IndexPopup() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center aspect-square w-44 flex-col bg-slate-100">
        <Weather />
      </div>
    </QueryClientProvider>
  )
}

export default IndexPopup
