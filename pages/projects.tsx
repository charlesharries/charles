import { Project } from "lib/types";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts } from 'lib/api';
import { coolGuyDate } from 'util/date';
import Image from "next/image";
import Layout from 'layouts/index';
import { PostHead } from "components/Head";

function Projects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  function date(project: Project) {
    if (project.custom_created_at) return project.custom_created_at;

    const createdAt = new Date(project.created_at);
    return coolGuyDate(createdAt);
  }

  const frontMatter = {
    slug: "projects",
    title: "Side projects",
    description: "Code stuff I've made on the side, mostly as experiments with new frameworks.",
  }

  return (
    <div className="Projects">
      <PostHead frontMatter={frontMatter} />
      <h1 className="Projects__title">Side projects</h1>
      <ul className="columns">
        {projects.map((project) => (
          <Link href={project.external_url} key={project.title}>
            <a className="Project__link column column-4">
              <hr className="mb-md" />
              <div className="Project__image mb-sm rounded overflow-hidden">
                <Image src={project.featured_image} alt={project.title} layout="fill" objectFit="cover" />
              </div>
              <p className="Project__title">
                <strong>{project.title}</strong>
                <span className="Project__date">{date(project)}</span>
                <span className="Project__go ml-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </p>
              <p className="Project_description">{project.summary}</p>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const projects = await getAllPosts('projects');

  return { props: { projects } };
}

export default Projects;
