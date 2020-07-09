declare module Models {
  declare type Link = {
    id?: number;
    provider: 'uptobox' | null;
    url: string;
  };

  declare type User = {
    email: string;
  };
}
