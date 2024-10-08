import { Client, Account, Avatars, Databases } from 'react-native-appwrite';
import { ID } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'co.edu.sena.aoraapp',
    projectId: '66e6e35f000669f087d0',
    databaseId: '66e6e589003dfccf062e',
    userCollectionId: '66e6e5b60010051b41f3',
    videoCollectionId: '66e6e5ee001bb0668c3c',
    storageId: '66e6e79d0010690e342a'
  };

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client)

// Register User

// appwrite.js
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        const avatarUrl = avatars.getInitials(username);

        // Solo llama a signIn si el usuario fue creado exitosamente
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error.message); // Asegúrate de lanzar el mensaje del error
    }
};

// Inicio de sesión
export const signIn = async (email, password) => {
    try {
        // Eliminar la sesión actual si existe
        const currentSession = await account.getSession('current');
        if (currentSession) {
            await account.deleteSession('current'); // Elimina la sesión activa
            console.log('Sesión anterior eliminada.');
        }

        // Crear una nueva sesión
        const session = await account.createEmailPasswordSession(email, password);
        console.log('Inicio de sesión exitoso:', session);
        
        return session;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        throw new Error(error.message);
    }
};
