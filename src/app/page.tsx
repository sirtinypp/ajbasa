import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { createClient } from './lib/supabase-server';

export default async function Home() {
  const supabase = await createClient();
  
  const [
    { data: projects },
    { data: experience },
    { data: achievements },
    { data: events },
    { data: configData }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('experience').select('*').order('order_index', { ascending: true }),
    supabase.from('achievements').select('*').order('year', { ascending: false }),
    supabase.from('events').select('*').order('date', { ascending: false }),
    supabase.from('site_configs').select('*')
  ]);

  const configs = configData?.reduce((acc: any, curr: any) => ({
    ...acc,
    [curr.key]: curr.data
  }), {} as any) || {};

  return (
    <div className="noise-bg">
      <Navbar identity={configs.identity} />
      <main>
        <Hero hero={configs.hero} identity={configs.identity} />
        <About about={configs.about} achievements={achievements || []} events={events || []} />
        <Projects initialProjects={projects || []} />
        <Skills skills={configs.skills} />
        <Experience experienceList={experience || []} />
        <Contact />
      </main>
      <Footer identity={configs.identity} />
    </div>
  );
}
