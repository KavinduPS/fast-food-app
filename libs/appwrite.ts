import {
  AuthParams,
  Categories,
  CreateUserParams,
  GetMenuParams,
  Menu,
} from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  categoryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID,
  customizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID,
  menuCustomizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID,
  platform: "com.kavi.fastfoodapp",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);
export const storage = new Storage(client);

export const signIn = async ({ email, password }: AuthParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error();
    await signIn({ email, password });

    const avatarUrl = avatar.getInitialsURL(name);

    const newUser = await database.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      {
        name: name,
        email: email,
        userId: newAccount.$id,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      [Query.equal("userId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    const user = currentUser.documents[0];
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.equal("name", query));

    const menu = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.menuCollectionId!,
      queries
    );

    return menu.documents as Menu[];
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await database.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.categoryCollectionId!
    );
    return categories.documents as Categories[];
  } catch (error) {
    throw new Error(error as string);
  }
};
