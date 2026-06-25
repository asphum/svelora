import type { InputProps } from '../Input/input.types.js'

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
    /**
     * Whether to show the password strength meter.
     * @default false
     */
    showStrength?: boolean

    /**
     * Custom function to calculate password strength (0 to 4).
     * 0 = Very Weak, 4 = Very Strong.
     */
    strengthFn?: (password: string) => number

    /**
     * Labels for the strength levels (0-4).
     * @default ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
     */
    strengthLabels?: [string, string, string, string, string]
}
