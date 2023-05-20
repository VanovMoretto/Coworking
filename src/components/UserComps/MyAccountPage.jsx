import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../Firebase';
import RequireLogin from '../../utils/RequireLogin';

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.currentUser) {
            const fetchUserData = async () => {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(userDoc);
                
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserData();
        } else {
            navigate("/requireLogin");
        }
    }, [auth, navigate]);

    // Verify if user is logged in before rendering the component
    if (!auth.currentUser) {
        return <RequireLogin />;
    }

    return (
        <div className="my-account">
            <h1>Minha Conta</h1>
            {userData ? (
                <div>
                    <p>Nome: {userData.fullName}</p>
                    <p>CPF: {userData.cpf}</p>
                    <p>Telefone: {userData.phone}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default MyAccount;