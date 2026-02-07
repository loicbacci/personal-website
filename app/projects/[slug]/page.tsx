import {
  getAllProjectSlugs,
  getProject,
  getProjectTitle,
} from '@/sanity/lib/api';
import MyPortableText from '@/components/portableText';
import { Metadata } from 'next';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
const iconNameSet = new Set<string>(Object.keys(dynamicIconImports));

const isIconName = (value: string): value is IconName => {
  return iconNameSet.has(value);
};

export async function generateStaticParams() {
  return await getAllProjectSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getProjectTitle(slug);

  const title = res ? res.title : slug;

  return {
    title,
  };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;

  const projectData = await getProject(slug);

  if (!projectData) {
    notFound();
  }

  return (
    <article className='flex flex-col space-y-3 pt-8'>
      <h1 className='pb-4'>{projectData.title}</h1>

      <div className='flex flex-col space-y-1'>
        <MyPortableText value={projectData.body} />
      </div>

      <div className='flex gap-6 flex-wrap pt-4'>
        {projectData.links &&
          projectData.links.map((l) => {
            return (
              <Link href={l.url} key={l._key} className='icon-link'>
                {l.icon && isIconName(l.icon) ? (
                  <DynamicIcon name={l.icon} className='m-auto' aria-hidden='true' />
                ) : null}
                <span>{l.title}</span>
              </Link>
            );
          })}
      </div>
    </article>
  );
}
