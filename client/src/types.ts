export type User = {
  uid: String;
  fullName: String;
  email: String;
};

export interface StoreContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
