export type JwtPayload = {
  sub: string;
  fullname: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
