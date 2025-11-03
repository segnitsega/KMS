import {create} from "zustand"
import {persist} from "zustand/middleware"

interface AuthState{
    isAuthenticated: boolean
    loading: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: any
    setIsAuthenticated: (value: boolean) => void
    setLoading: (value: boolean) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserData: (value: any) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false, 
            loading: true,
            userData: {},
            setIsAuthenticated: (value) => set({isAuthenticated: value}),
            setLoading: (value) => set({loading: value}),
            setUserData: (value) => set({userData: value})
        }), {
            name: "authStore"
        }
    )
)

