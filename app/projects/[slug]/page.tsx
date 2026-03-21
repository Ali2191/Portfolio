import { projects, getProjectBySlug, getOtherProjects } from '../../data/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetail from './ProjectDetail';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title:'Project Not Found' };
  return { title:p.title, description:p.tagline, openGraph:{title:`${p.title} | Ali Tayyab`, description:p.tagline, type:'website'} };
}

export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();
  const others = getOtherProjects(slug);
  return <ProjectDetail project={p} others={others} />;
}
