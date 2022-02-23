
import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    (set, get) => ({
        geoLocation: {},
        enableGeo: false,
        searchInput: "",
        setGeolocation: (geoLocation) => set({ geoLocation }),
        clearGeolocation: (geoLocation) => set({ geoLocation }),
        setEnableGeo: (enableGeo) => set({ enableGeo }),
        setSearchInput: (searchInput) => set({ searchInput }),
        setStopPoint: (stopPoint) => set({ stopPoint })
    }),
    {
        name: "geoLocation"
    }
))