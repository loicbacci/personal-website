import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from '@portabletext/react';

const myBr = () => <div className='py-1' />;

const comps = {
  marks: {
    br: myBr,
  },
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      const url = urlFor(value).url();
      return <Image src={url} alt='' objectFit='contain' />;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyPortableText = (props: any) => {
  return <PortableText {...props} components={comps} />;
};

export default MyPortableText;
