/**
 * ชื่อฟิลด์สำหรับ form submission — ใส่ suffix `[]` เมื่อส่งหลายค่า
 * เพื่อให้เข้ากับ SvelteKit `convert_formdata` และ HTML FormData
 */
export function resolveFormFieldName(
    name: string | undefined,
    multiple: boolean
): string | undefined {
    if (!name) return undefined
    if (!multiple) return name
    return name.endsWith('[]') ? name : `${name}[]`
}
