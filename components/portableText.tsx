import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from '@portabletext/react';

const myBr = () => <div className='py-1' />;
type PortableTextImage = SanityImageSource & { alt?: string };

const comps = {
  marks: {
    br: myBr,
  },
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      const url = urlFor(value).url();
      const alt = value.alt?.trim() || 'Project image';
      return (
        <Image
          src={url}
          alt={alt}
          width={1600}
          height={900}
          sizes='(min-width: 1280px) 50rem, (min-width: 1024px) 42rem, 100vw'
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      );
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyPortableText = (props: any) => {
  return <PortableText {...props} components={comps} />;
};

export default MyPortableText;
