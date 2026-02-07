'use client';

import Image from 'next/image';
import Link from 'next/link';
import { INDEX_INFO_QUERYResult } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';
import MyPortableText from '@/components/portableText';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  info: INDEX_INFO_QUERYResult;
}

const iconNameSet = new Set<string>(Object.keys(dynamicIconImports));

const isIconName = (value: string): value is IconName => {
  return iconNameSet.has(value);
};

const Header = ({ info }: HeaderProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!info) return null;

  const profileUrl = urlFor(info.profileImage).url();
  const headerLinks = info.links?.filter((l) => l.inHeader) ?? [];
  const profileAlt =
    info.profileImage.alt?.trim() || `Profile picture of ${info.name}`;

  return (
    <header className='flex flex-col items-center gap-4'>
      <div className='w-40 lg:w-48 h-40 lg:h-48 relative'>
        <Image
          className='rounded-full'
          src={profileUrl}
          alt={profileAlt}
          sizes='(min-width: 1024px) 12rem, 10rem'
          priority
          fill={true}
        />
      </div>

      {isHome ? (
        // Show website name at home
        <h1 className='text-4xl lg:text-5xl font-bold'>{info.name}</h1>
      ) : (
        // Enable to click on the name to go home
        <Link href='/' className='icon-link'>
          <h1 className='text-4xl lg:text-5xl font-bold primary-text'>
            {info.name}
          </h1>
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
            <Link href={l.url} key={l._key} className='icon-link' aria-label={l.title}>
              {l.icon && isIconName(l.icon) ? (
                <DynamicIcon name={l.icon} className='m-auto' aria-hidden='true' />
              ) : null}
              <span className='sr-only'>{l.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
