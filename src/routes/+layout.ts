import type { Load } from '@sveltejs/kit'

export const load: Load = ({ url }) => {
    return {
        pathname: url.pathname
    }
}
