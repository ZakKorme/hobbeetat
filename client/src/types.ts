export interface AccountResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: Date;
    is_active: boolean;
    is_staff: boolean;
    is_confirmed: boolean;
    date_joined: Date;
  };
  access: string;
  refresh: string;
}
