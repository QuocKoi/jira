import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType"

export const actDisplayLoading = () => {
    return {
        type: DISPLAY_LOADING
    }
}
export const actHideLoading = () => {
    return {
        type: HIDE_LOADING
    }
}