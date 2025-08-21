import { getAllProjectsInfo, getIndexInfo } from '@/sanity/lib/api';
import Link from 'next/link';
import { DynamicIcon } from 'lucide-react/dynamic';
import ProjectList from '@/components/ProjectsList';

export default async function Home() {
  const info = await getIndexInfo();
  const projectsInfo = await getAllProjectsInfo();

  if (!info || !info.links || !projectsInfo) {
    return 'Invalid data';
  }

  return (
    <div className='flex flex-col gap-10 pt-4'>
      <section className='flex flex-col gap-6'>
        <h2>Projects</h2>
        <ProjectList projectsInfo={projectsInfo} />
      </section>

      {info.links.length > 0 && (
        <section className='flex flex-col gap-4'>
          <h2>Links</h2>

          <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 flex-wrap items-start'>
            {info.links.map((l) => (
              <Link href={l.url} key={l.url}>
                <div className='icon-link'>
                  {/*// @ts-expect-error: is in fact the right value*/}
                  {l.icon && <DynamicIcon name={l.icon} className='m-auto' />}
                  <span>{l.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
