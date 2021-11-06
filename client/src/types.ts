export interface AccountResponse {
  user: {
    id: string;
    email: string;
    username: string;
    is_active: boolean;
    create: Date;
    updated: Date;
  };
  access: string;
  refresh: string;
}
