import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeText(str: string): string {
    const wordList: string[] = str.split(" ");
    const capitalizedWords: string[] = wordList.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(" ");
}

export function isValidJSON(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}