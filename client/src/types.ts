export interface AccountResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    is_active: boolean;
    date_joined: Date;
    is_staff: boolean;
  };
  access: string;
  refresh: string;
}
