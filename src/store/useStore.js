
import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    (set, get) => ({
        geoLocation: {},
        MaxSearchRadius: 225,
        searchInput: "",
        setGeolocation: (geoLocation) => set({ geoLocation }),
        clearGeolocation: (geoLocation) => set({ geoLocation }),
        setSearchInput: (searchInput) => set({ searchInput }),
        setStopPoint: (stopPoint) => set({ stopPoint }),
        setSetting: (key, input) => set((state) => void (state[key] = input)),
    }),
    {
        name: "geoLocation"
    }
))