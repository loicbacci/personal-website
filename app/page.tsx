import { getAllProjectsInfo, getIndexInfo } from '@/sanity/lib/api';
import Link from 'next/link';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import ProjectList from '@/components/ProjectsList';

const iconNameSet = new Set<string>(Object.keys(dynamicIconImports));

const isIconName = (value: string): value is IconName => {
  return iconNameSet.has(value);
};

export default async function Home() {
  const info = await getIndexInfo();
  const projectsInfo = await getAllProjectsInfo();

  return (
    <div className='flex flex-col gap-10 pt-4'>
      <section className='flex flex-col gap-6'>
        <h2>Projects</h2>
        <ProjectList projectsInfo={projectsInfo} />
      </section>

      {info?.links && info.links.length > 0 && (
        <section className='flex flex-col gap-4'>
          <h2>Links</h2>

          <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 flex-wrap items-start'>
            {info.links.map((l) => (
              <Link href={l.url} key={l._key} className='icon-link'>
                {l.icon && isIconName(l.icon) ? (
                  <DynamicIcon name={l.icon} className='m-auto' aria-hidden='true' />
                ) : null}
                <span>{l.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
