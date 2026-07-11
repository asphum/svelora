import { describe, expect, it } from 'vitest'
import { resolveFormFieldName } from './resolve-form-field-name.js'

describe('resolveFormFieldName', () => {
    it('คืน undefined เมื่อไม่มีชื่อ', async () => {
        expect(resolveFormFieldName(undefined, true)).toBeUndefined()
    })

    it('คืนชื่อเดิมเมื่อ single value', async () => {
        expect(resolveFormFieldName('kind', false)).toBe('kind')
    })

    it('เติม [] เมื่อ multiple values', async () => {
        expect(resolveFormFieldName('categoryIds', true)).toBe('categoryIds[]')
    })

    it('ไม่เติม [] ซ้ำ', async () => {
        expect(resolveFormFieldName('categoryIds[]', true)).toBe('categoryIds[]')
    })
})
