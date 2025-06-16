// Utility functions for generating project files

export const generateIndividualProjectFile = (project) => {
  // Create variable name: remove "Project " prefix if it exists, then add "project" prefix
  let cleanTitle = project.title;
  if (cleanTitle.toLowerCase().startsWith('project ')) {
    cleanTitle = cleanTitle.substring(8); // Remove "Project " (8 chars)
  }
  const projectVarName = `project${cleanTitle.replace(/[^a-zA-Z0-9]/g, '')}`;
  
  const formatCodeSnippets = (snippets) => {
    if (!snippets || snippets.length === 0) return '[]';
    
    return `[
${snippets.map(snippet => `                {
                    title: '${snippet.title}',
                    description: ${snippet.description ? `'${snippet.description}'` : 'null'},
                    language: '${snippet.language}',
                    snippet: \`${snippet.snippet}\`
                }`).join(',\n')}
            ]`;
  };

  const formatSubpages = (subpages) => {
    if (!subpages || subpages.length === 0) return '[]';
    
    return `[
${subpages.map(subpage => `        {
            id: ${subpage.id},
            title: '${subpage.title}',
            description: '${subpage.description}',
            images: [${subpage.images.map(img => `'${img}'`).join(', ')}],
            codeSnippets: ${formatCodeSnippets(subpage.codeSnippets)}
        }`).join(',\n')}
    ]`;
  };

  return `export const ${projectVarName} = {
    id: ${project.id},
    title: '${project.title}',
    description: "${project.description}",
    headerImage: '${project.headerImage}',
    images: [${project.images.map(img => `'${img}'`).join(', ')}],
    tags: [${project.tags.map(tag => `'${tag}'`).join(', ')}],
    tools: [${project.tools.map(tool => `'${tool}'`).join(', ')}],
    toolIcons: [${project.toolIcons.map(icon => `'${icon}'`).join(', ')}],
    subpages: ${formatSubpages(project.subpages)}
};`;
};

export const generateProjectsIndexFile = (projects) => {
  const imports = projects.map(project => {
    // Map to actual exported variable names and file names
    let projectVarName, fileName;
    
    if (project.title.toLowerCase().includes('starfall')) {
      projectVarName = 'projectProjectStarfall';
      fileName = 'starfall';
    } else if (project.title.toLowerCase().includes('alien')) {
      projectVarName = 'projectAlienAbductors';
      fileName = 'alienabductors';
    } else if (project.title.toLowerCase().includes('testing')) {
      projectVarName = 'TestingProject';
      fileName = 'testing';
    } else {
      // For new projects, use a clean version of the title
      let cleanTitle = project.title;
      if (cleanTitle.toLowerCase().startsWith('project ')) {
        cleanTitle = cleanTitle.substring(8);
      }
      projectVarName = `project${cleanTitle.replace(/[^a-zA-Z0-9]/g, '')}`;
      fileName = project.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    }
    
    return `import { ${projectVarName} } from './Projects/${fileName}';`;
  }).join('\n');

  const exports = projects.map(project => {
    // Map to actual exported variable names
    if (project.title.toLowerCase().includes('starfall')) {
      return 'projectProjectStarfall';
    } else if (project.title.toLowerCase().includes('alien')) {
      return 'projectAlienAbductors';
    } else if (project.title.toLowerCase().includes('testing')) {
      return 'TestingProject';
    } else {
      // For new projects
      let cleanTitle = project.title;
      if (cleanTitle.toLowerCase().startsWith('project ')) {
        cleanTitle = cleanTitle.substring(8);
      }
      return `project${cleanTitle.replace(/[^a-zA-Z0-9]/g, '')}`;
    }
  }).join(',\n  ');

  return `${imports}

export const projectsData = [
  ${exports}
];

export const getUniqueTags = (projects) => {
  const allTags = projects.flatMap((project) => project.tags || []);
  const uniqueTagsSet = new Set(allTags);
  return [...uniqueTagsSet];
};

export const uniqueTags = getUniqueTags(projectsData);`;
};

export const downloadFile = (content, filename) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
