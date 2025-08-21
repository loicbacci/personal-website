import { getAllProjectsInfo, getIndexInfo } from '@/sanity/lib/api';
import Layout from '@/components/Layout';
import { urlFor } from '@/sanity/lib/image';
import ProjectList from '@/components/ProjectsList';

export default async function Projects() {
  const info = await getIndexInfo();
  const projectsInfo = await getAllProjectsInfo();

  if (!info || !info.links || !projectsInfo) {
    return <div>Oups</div>;
  }

  return (
    <Layout
      headerInfo={{
        name: info.name,
        profileUrl: urlFor(info.profileImage).url(),
      }}
    >
      <section className='flex flex-col space-y-2'>
        <h2 className='pb-2'>Projects</h2>
        <ProjectList projectsInfo={projectsInfo} />
      </section>
    </Layout>
  );
}
