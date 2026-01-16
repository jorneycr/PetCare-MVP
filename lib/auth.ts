import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (password.length > 100) {
        errors.push('Password cannot exceed 100 characters');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}
