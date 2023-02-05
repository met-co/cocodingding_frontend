const CLIENT_ID = '306c476f21776ce73e2df07d1ca45995';
const REDIRECT_URI = 'http://localhost:3000/user/login';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
