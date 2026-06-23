import type { Load } from '@sveltejs/kit'

export const load: Load = ({ params }) => {
    return {
        slug: params.slug
    }
}
