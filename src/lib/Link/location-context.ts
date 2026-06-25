export const LINK_LOCATION_CONTEXT_KEY: unique symbol = Symbol('svelora:link-location')

export interface LinkLocationContext {
    currentUrl: () => URL
}
