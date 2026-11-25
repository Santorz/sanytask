import { Metadata } from 'next';

export const generateMetaData = (title: string, desc: string) => {
  const metadata: Metadata = {
    title: title,
    description: desc,
  };
  return metadata;
};
