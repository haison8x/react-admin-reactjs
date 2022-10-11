export interface JwtSign {
  access_token: string;
  refresh_token: string;
  id: number;
  username: string;
  fullname: string;
  role: string;
  avatar: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

export interface Payload {
  userId: string;
  username: string;
  role: string;
}

export interface Login {
  username: string;
  password: string;
  role: string;

}
