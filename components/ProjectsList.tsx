import Link from 'next/link';
import React from 'react';
import { PROJECTS_INFO_QUERYResult } from '@/sanity/lib/types';

interface ProjectListProps {
  projectsInfo: PROJECTS_INFO_QUERYResult;
}

const ProjectList = ({ projectsInfo }: ProjectListProps) => (
  <div className='grid gap-2 lg:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pb-2'>
    {projectsInfo.map(({ slug, title, description }) => {
      const href = `/projects/${slug}`;

      return (
        <Link key={slug} href={href} passHref>
          <div className='flex flex-col card cursor-pointer'>
            <p className='primary-text font-semibold'>{title}</p>
            <p className='description'>{description}</p>
          </div>
        </Link>
      );
    })}
  </div>
);

export default ProjectList;
