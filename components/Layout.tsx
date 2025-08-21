import React from 'react';
import { Stack } from '@chakra-ui/react';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
  isHome?: boolean;
  headerInfo?: { name: string; profileUrl: string };
}

const Layout = ({ children, isHome, headerInfo }: LayoutProps) => {
  return (
    <div className='container pb-10 pt-8 lg:pt-16 mb-10 mx-auto px-4 lg:px-20'>
      <Stack>
        {/* Check if the header is shown*/}
        {headerInfo && (
          <Header
            isHome={isHome}
            profileUrl={headerInfo.profileUrl}
            name={headerInfo.name}
          />
        )}

        <main>
          <div className='flex flex-col space-y-2'>{children}</div>
        </main>
      </Stack>
    </div>
  );
};

export default Layout;
