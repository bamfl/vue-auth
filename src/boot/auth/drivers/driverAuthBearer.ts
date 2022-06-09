import { IBearerRequest, IBearerResponse, IAuth } from 'src/types/types';

const bearer = {
  request: function (req: IBearerRequest, token: string) {
    (this as IAuth).drivers.http.setHeaders.call(this, req, {
      Authorization: 'Bearer ' + token
    });
  },
  response: function (res: IBearerResponse) {
    if (res.data.token) {
      return res.data.token;
    }

    const headers = (this as IAuth).drivers.http.getHeaders.call(this, res);

    let token = headers.Authorization || headers.authorization;

    if (token) {
      token = token.split(/Bearer:?\s?/i)[1];
      return token[token.length > 1 ? 1 : 0].trim();
    }
  }
};

export default bearer;
