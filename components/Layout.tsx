import React from 'react';
import Header from '@/components/Header';
import { INDEX_INFO_QUERYResult } from '@/sanity/lib/types';

interface LayoutProps {
  children: React.ReactNode;
  headerInfo?: INDEX_INFO_QUERYResult;
}

const Layout = ({ children, headerInfo }: LayoutProps) => {
  return (
    <div className='container pb-10 pt-8 lg:pt-16 mb-10 mx-auto px-4 lg:px-20'>
      <div className='flex flex-col gap-2'>
        {/* Check if the header is shown*/}
        {headerInfo && <Header info={headerInfo} />}

        <main>
          <div className='flex flex-col space-y-2'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
