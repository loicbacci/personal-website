import {
  getAllProjectSlugs,
  getProject,
  getProjectTitle,
} from '@/sanity/lib/api';
import MyPortableText from '@/components/portableText';
import { Metadata } from 'next';
import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

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
    return 'Data not found';
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
              <Link href={l.url} key={l.url}>
                <div className='icon-link'>
                  {/* @ts-expect-error: is in fact the right value*/}
                  {l.icon && <DynamicIcon name={l.icon} className='m-auto' />}
                  <span>{l.title}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </article>
  );
}
