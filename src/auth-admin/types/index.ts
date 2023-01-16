export type JwtPayload = {
  sub: string;
  adminCode: number;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
