'use client';

import { useState } from 'react';
import { portfolioData } from '../lib/portfolio-data';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects({ initialProjects = [] }: { initialProjects?: any[] }) {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'web-app'>('enterprise');

  const filteredProjects = initialProjects.filter(p => p.category === activeTab);


  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gradient-start)] rounded-full opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="section-heading">Projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-3">
            Things I&apos;ve built
          </h2>
          
          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 p-1 bg-surface/50 backdrop-blur-md rounded-xl border border-surface-border w-fit mx-auto mt-8">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeTab === 'enterprise' 
                  ? 'bg-accent text-white' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Enterprise
            </button>
            <button
              onClick={() => setActiveTab('web-app')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeTab === 'web-app' 
                  ? 'bg-accent text-white' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Web Apps
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.title} className="project-card group flex flex-col">
              {/* Image / Gradient Header */}
              <div className="relative h-48 w-full overflow-hidden">
                {project.thumbnail ? (
                  <div className="w-full h-full relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 z-10 group-hover:opacity-10 transition-opacity`} />
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-10 flex items-center justify-center`}>
                    <span className="text-6xl grayscale opacity-20 group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </span>
                  </div>
                )}
                {/* Brand Strip */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 z-20 bg-gradient-to-r ${project.color}`} />
              </div>

              <div className="p-7 flex-grow flex flex-col">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{project.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-light transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 font-medium uppercase tracking-wider">
                      {project.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--surface)] border border-surface-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <Link
                  href={`/projects#${project.slug}`}
                  className="flex items-center gap-2 text-sm text-accent-light font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>View Full Details</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
