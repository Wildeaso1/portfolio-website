import { projectProjectStarfall } from './Projects/starfall';
import { projectAlienAbductors } from './Projects/alienabductors';
import { TestingProject } from './Projects/testing';

export const projectsData = [
  projectProjectStarfall,
  projectAlienAbductors,
  TestingProject
];

export const getUniqueTags = (projects) =>
{
  const allTags = projects.flatMap((project) => project.tags || []);
  const uniqueTagsSet = new Set(allTags);
  return [ ...uniqueTagsSet ];
};

export const uniqueTags = getUniqueTags(projectsData);