import { VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  name: string;
  profileUrl: string;
  isHome?: boolean;
}

const Header = ({ name, profileUrl, isHome }: HeaderProps) => {
  return (
    <VStack gap={4} as='header'>
      <div className='w-40 lg:w-48 h-40 lg:h-48 relative'>
        {profileUrl && (
          <Image
            className='rounded-full'
            src={profileUrl}
            alt='Profile Picture'
            fill={true}
          />
        )}
      </div>

      {isHome ? (
        // Show website name at home
        <h1 className='text-4xl lg:text-5xl font-bold'>{name}</h1>
      ) : (
        // Enable to click on the name to go home
        <Link href='/' passHref>
          <div className='icon-link'>
            <h1 className='text-4xl lg:text-5xl font-bold primary-text'>
              {name}
            </h1>
          </div>
        </Link>
      )}
    </VStack>
  );
};

export default Header;
