import { projectStarfall } from './Projects/starfall';
import { projectAlienAbductors } from './Projects/alienabductors';
import { TestingProject } from './Projects/testing';

export const projectsData = [
  projectStarfall,
  projectAlienAbductors,
  TestingProject,
  // Add new projects here
];

export const getUniqueTags = (projects) => {
  const allTags = projects.flatMap((project) => project.tags || []);
  const uniqueTagsSet = new Set(allTags);
  return [...uniqueTagsSet];
};

// Get unique tags from actual project data, without adding 'all'
export const uniqueTags = getUniqueTags(projectsData);

// Add this at the bottom of your projects.js file temporarily
console.log("Project Data:", projectsData);
console.log("Unique Tags:", uniqueTags);
projectsData.forEach(project => {
  console.log(`Project ${project.id}: Tags =`, project.tags);
});