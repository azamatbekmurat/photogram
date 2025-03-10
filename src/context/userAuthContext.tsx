import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserAuthProviderProps {
    children: React.ReactNode
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const logOut = () => {
    signOut(auth);
}

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn
})



export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log("The logged in user state is: ", user);
                const temp = print_unicode_message("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub")
                console.log("secret word: ", temp)

                setUser(user);
            }

            return () => {
                unsubscribe();
            }
        })
    }, [])
    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }

    return (
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext)
}

async function print_unicode_message(docUrl: string) {
    try {
        // Fetch the document data
        const response = await fetch(docUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. HTTP status: ${response.status}`);
        }
        const rawData = await response.text();

        // Parse the CSV data
        const gridData = [];
        const rows = rawData.split('\n');
        rows.forEach(row => {
            const [char, x, y] = row.split(',');
            if (char && x && y) {
                gridData.push({ char, x: parseInt(x, 10), y: parseInt(y, 10) });
            }
        });

        // Determine grid dimensions
        const maxX = Math.max(...gridData.map(item => item.x));
        const maxY = Math.max(...gridData.map(item => item.y));

        // Create and populate the grid
        const grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(' '));
        gridData.forEach(({ char, x, y }) => {
            grid[y][x] = char;
        });

        // Print the grid
        grid.forEach(row => console.log(row.join('')));
    } catch (error) {
        console.error('Error:', error.message);
    }
}
