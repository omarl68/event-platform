import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenEnum } from '../constants/constants';
import { JwtConfig } from '../config/envVar';

const PasswordHashing = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, Number(JwtConfig.passwordSalt));
  return result;
};

const PasswordCompare = async (password: string, passwordHash: string): Promise<boolean> => {
  const matched = await bcrypt.compare(password, passwordHash);
  return matched;
};

const GenerateToken = (data: TokenData, type: string): string => {
  let secretKey;
  let expiresTime;
  if (type === TokenEnum.access) {
    secretKey = JwtConfig.accessTokenSecret as string;
    expiresTime = JwtConfig.accessTokenExpiresIn as string;
  } else if (type === TokenEnum.refresh) {
    secretKey = JwtConfig.refreshTokenSecret as string;
    expiresTime = JwtConfig.refreshTokenExpiresIn as string;
  } else {
    secretKey = JwtConfig.resetPasswordTokenSecret as string;
    expiresTime = JwtConfig.resetPasswordExpiresIn as string;
  }
  const token = jwt.sign(data, secretKey, {
    expiresIn: String(expiresTime),
  });
  return token;
};

const ExtractToken = (token: string, type: string): TokenData | null => {
  let secretKey;
  if (type === TokenEnum.access) {
    secretKey = JwtConfig.accessTokenSecret as string;
  } else if (type === TokenEnum.refresh) {
    secretKey = JwtConfig.refreshTokenSecret as string;
  } else {
    secretKey = JwtConfig.resetPasswordTokenSecret as string;
  }

  let resData: any;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: TokenData = <TokenData>resData;
    return result;
  }

  return null;
};

export default {
  PasswordHashing,
  PasswordCompare,
  GenerateToken,
  ExtractToken,
};
