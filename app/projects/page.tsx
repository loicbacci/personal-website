import { getAllProjectsInfo } from '@/sanity/lib/api';
import ProjectList from '@/components/ProjectsList';

export default async function Projects() {
  const projectsInfo = await getAllProjectsInfo();

  if (!projectsInfo) {
    return <div>Oups</div>;
  }

  return (
    <section className='flex flex-col space-y-2'>
      <h2 className='pb-2'>Projects</h2>
      <ProjectList projectsInfo={projectsInfo} />
    </section>
  );
}
