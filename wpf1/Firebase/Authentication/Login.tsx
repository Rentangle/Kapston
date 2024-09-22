// Firebase/Authentication/Login.ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Initialize/firebaseConfig'; // Adjust the import path as necessary

interface LoginResponse {
    success: boolean;
    message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true }; // Success response
    } catch (error) {
        console.error(error);
        const errorMessage = (error as Error).message || 'An unknown error occurred.';
        return { success: false, message: errorMessage }; // Error response
    }
};
