import { describe, expect, it } from 'vitest'
import { resolveFormFieldName } from './resolve-form-field-name.js'

describe('resolveFormFieldName', () => {
    it('คืน undefined เมื่อไม่มีชื่อ', () => {
        expect(resolveFormFieldName(undefined, true)).toBeUndefined()
    })

    it('คืนชื่อเดิมเมื่อ single value', () => {
        expect(resolveFormFieldName('kind', false)).toBe('kind')
    })

    it('เติม [] เมื่อ multiple values', () => {
        expect(resolveFormFieldName('categoryIds', true)).toBe('categoryIds[]')
    })

    it('ไม่เติม [] ซ้ำ', () => {
        expect(resolveFormFieldName('categoryIds[]', true)).toBe('categoryIds[]')
    })
})
