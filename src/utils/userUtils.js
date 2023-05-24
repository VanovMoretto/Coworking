import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";

export const updateUserDisplayName = async (user) => {
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
        const { fullName } = docSnap.data();
        const firstName = fullName.split(' ')[0];
        user.displayName = firstName;
    }
}