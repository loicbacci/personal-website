import { getIndexInfo } from '@/sanity/lib/api';
import Layout from '@/components/Layout';
import MyPortableText from '@/components/portableText';
import { Box, Center, VStack } from '@chakra-ui/react';
import { urlFor } from '@/sanity/lib/image';
import { Tooltip } from '@/components/ui/tooltip';
import Link from 'next/link';
import { DynamicIcon } from 'lucide-react/dynamic';

export default async function Home() {
  const info = await getIndexInfo();
  console.log(info);

  if (!info || !info.links) {
    return <div>Oups</div>;
  }

  const headerLinks = info.links.filter((l) => l.inHeader);
  const notHeaderLinks = info.links.filter((l) => !l.inHeader);

  return (
    <Layout
      isHome
      headerInfo={{
        name: info.name,
        profileUrl: urlFor(info.profileImage).url(),
      }}
    >
      <Center>
        <VStack gap={4}>
          <Box style={{ textAlign: 'center' }}>
            <MyPortableText value={info.content} />
          </Box>
          <div className='flex gap-6 flex-wrap'>
            {headerLinks.map((l) => {
              const Icon = l.icon && (
                // @ts-expect-error: is in fact the right value
                <DynamicIcon name={l.icon} className='m-auto' />
              );
              return (
                <Tooltip content={l.title} showArrow key={l._key}>
                  <div>
                    <Link href={l.url}>
                      <div className='icon-link'>{l.icon && Icon}</div>
                    </Link>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </VStack>
      </Center>

      <div className='flex flex-col space-y-10 pt-4'>
        <section className='flex flex-col space-y-2'>
          <h2 className='pb-2'>Projects</h2>
          {/*<ProjectList projectsMeta={projectsMeta} />*/}
        </section>

        {notHeaderLinks.length > 0 && (
          <section className='flex flex-col space-y-2'>
            <h2>Links</h2>

            <div className='flex gap-6 flex-wrap'>
              {notHeaderLinks.map((l) => {
                const Icon = l.icon && (
                  // @ts-expect-error: is in fact the right value
                  <DynamicIcon name={l.icon} className='m-auto' />
                );
                return (
                  <Link href={l.url} key={l.url}>
                    <div className='icon-link'>
                      {l.icon && Icon}
                      <span>{l.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );

  // return (
  //   <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
  //     <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
  //       <section>
  //         {info && info.content && <MyPortableText value={info.content} />}
  //         {info && info.profileImage && (
  //           <div className='w-40 lg:w-48 h-40 lg:h-48 relative'>
  //             {info && info.profileImage && (
  //               <Image
  //                 className='rounded-full'
  //                 src={urlFor(info.profileImage).url()}
  //                 alt='Profile Image'
  //                 fill={true}
  //                 // objectFit='cover'
  //               />
  //             )}
  //           </div>
  //         )}
  //       </section>
  //     </main>
  //   </div>
  // );
}
