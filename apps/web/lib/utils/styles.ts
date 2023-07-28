import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * ## mergeClass
 *
 * Merge the classname from conflicting
 * and make sure the class become clear
 * This will be useful if working on variant components
 *
 * @param inputs the classname
 * @returns {string}
 */
export const mergeClass: (...inputs: ClassValue[]) => string = (...inputs) => {
  return twMerge(clsx(inputs))
}
