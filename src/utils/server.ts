import { headers } from 'next/headers';

export const getProtocalAndHost = () => {
  const host =
    process.env.NODE_ENV === 'development' ? headers().get('host') : process.env.PROD_HOST;

  const protocal =
    process.env.NODE_ENV === 'development' ? process.env.DEV_PROTOCOL : process.env.PROD_PROTOCOL;

  return {
    host,
    protocal,
  };
};

export const getDomain = () => {
  const { host, protocal } = getProtocalAndHost();
  return `${protocal}://${host}`;
};
