import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '../lib/supabase-server';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  const [
    { data: projects },
    { data: configData }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('site_configs').select('*')
  ]);

  const configs = configData?.reduce((acc: any, curr: any) => ({
    ...acc,
    [curr.key]: curr.data
  }), {} as any) || {};

  return (
    <div className="noise-bg min-h-screen flex flex-col">
      <Navbar identity={configs.identity} />
      
      <main className="flex-grow pt-32 pb-20">
        <ProjectsClient initialProjects={projects || []} />
      </main>

      <Footer identity={configs.identity} />
    </div>
  );
}
