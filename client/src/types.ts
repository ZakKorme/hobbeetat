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
  hobbies: string[];
}

export interface GroupResponse {
  group: {
    id: string;
    name: string;
    description: string;
    enrollmentStatus: string;
    hobby: string;
    groupCreator: string;
  };
}

export interface NotificationResponse {
  id: number;
  creator: object;
  is_seen: boolean;
  type: string;
  object: object;
  created_on: string;
}
