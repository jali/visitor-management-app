import { jwtDecode } from 'jwt-decode';

export function decodedTokenData(token) {
  const decoded = jwtDecode(token);
  return decoded;
}