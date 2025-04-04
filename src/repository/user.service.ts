import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc
} from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user);
        
    } catch (error) {
        console.log(error);
    }
};


export const getUserProfile = async (userId: string) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        let tempData: ProfileResponse = {};

        if(querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile;
                tempData = {
                    id: doc.id,
                    ...userData
                }
        
            });
    
            return tempData;
        } else {
            console.log("No such document");
            return null;
        }
    } catch (error) {
        console.log(error);
    }
  
};

export const updateUserProfile = async (id: string, user: UserProfile) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, {
    ...user
  });
};

export const getAllUsers = async (userId: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const tempArr: ProfileResponse[] = [];

        if(querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile;
                const responseObj: ProfileResponse = {
                    id: doc.id,
                    ...userData
            }

            tempArr.push(responseObj);
            });

            return tempArr.filter((item) => item.id !== userId);
        }
        else {
            console.log("No such document");
        }
        }
    catch(error) {
        console.log(error);
    }
}