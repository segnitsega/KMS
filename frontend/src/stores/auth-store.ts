import {create} from "zustand"
import {persist} from "zustand/middleware"

interface AuthState{
    isAuthenticated: boolean
    loading: boolean
    setIsAuthenticated: (value: boolean) => void
    setLoading: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false, // for now 
            loading: true,
            setIsAuthenticated: (value) => set({isAuthenticated: value}),
            setLoading: (value) => set({loading: value})
        }), {
            name: "authStore"
        }
    )
)

