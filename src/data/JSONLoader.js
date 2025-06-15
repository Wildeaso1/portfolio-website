/**
 * Loads all project data from JSON files
 * @returns {Promise<Array>} Array of processed project objects
 */
export const loadProjects = async () =>
{
    try
    {
        // Dynamically import all JSON files in the projects directory
        const projectModules = import.meta.glob('../data/projects/*.json');

        // Create an array of promises to load each project
        const projectPromises = Object.entries(projectModules).map(async ([ path, importProject ]) =>
        {
            const project = await importProject();
            return project.default || project; // Handle different module formats
        });

        // Wait for all projects to load
        const projects = await Promise.all(projectPromises);

        // Sort projects by id or any other criteria
        return projects.sort((a, b) => a.id - b.id);
    } catch (error)
    {
        console.error('Error loading projects:', error);
        return [];
    }
};

/**
 * Gets all unique tags from the projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique tags
 */
export const getUniqueTags = (projects) =>
{
    const allTags = projects.flatMap((project) => project.tags || []);
    const uniqueTagsSet = new Set(allTags);
    return [ 'all', ...uniqueTagsSet ];
};