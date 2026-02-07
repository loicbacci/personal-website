import { getAllProjectsInfo } from '@/sanity/lib/api';
import ProjectList from '@/components/ProjectsList';

export default async function Projects() {
  const projectsInfo = await getAllProjectsInfo();

  return (
    <section className='flex flex-col space-y-2'>
      <h2 className='pb-2'>Projects</h2>
      {projectsInfo.length > 0 ? (
        <ProjectList projectsInfo={projectsInfo} />
      ) : (
        <p>No projects published yet.</p>
      )}
    </section>
  );
}
