'use client';

import Image from 'next/image';
import Link from 'next/link';
import { INDEX_INFO_QUERYResult } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';
import MyPortableText from '@/components/portableText';
import { DynamicIcon } from 'lucide-react/dynamic';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  info: INDEX_INFO_QUERYResult;
}

const Header = ({ info }: HeaderProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!info || !info.links) return null;

  const profileUrl = urlFor(info.profileImage).url();
  const headerLinks = info.links.filter((l) => l.inHeader);

  return (
    <header className='flex flex-col items-center gap-4'>
      <div className='w-40 lg:w-48 h-40 lg:h-48 relative'>
        <Image
          className='rounded-full'
          src={profileUrl}
          alt='Profile Picture'
          fill={true}
        />
      </div>

      {isHome ? (
        // Show website name at home
        <h1 className='text-4xl lg:text-5xl font-bold'>{info.name}</h1>
      ) : (
        // Enable to click on the name to go home
        <Link href='/' passHref>
          <div className='icon-link'>
            <h1 className='text-4xl lg:text-5xl font-bold primary-text'>
              {info.name}
            </h1>
          </div>
        </Link>
      )}

      <div className='flex flex-col items-center justify-center gap-4'>
        {/* Info text contents */}
        <div className='text-center'>
          <MyPortableText value={info.content} />
        </div>
        {/* Links */}
        <div className='flex gap-6 flex-wrap'>
          {headerLinks.map((l) => (
            <Link href={l.url} key={l._key}>
              <div className='icon-link'>
                {/* @ts-expect-error: is in fact the right value*/}
                {l.icon && <DynamicIcon name={l.icon} className='m-auto' />}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
