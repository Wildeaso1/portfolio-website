export const projectTemplate = {
    id: null,                // Unique identifier
    title: '',              // Project title
    description: '',        // Main project description
    headerImage: '',        // Main header image path
    images: [],            // Array of image paths
    tags: [],             // Array of project tags
    tools: [],           // Array of tools/technologies used
    toolIcons: [],      // Array of tool icons
    subpages: [
        {
            id: null,
            title: '',
            description: '',
            images: [],
            codeSnippets: [
                {
                    title: '',
                    description: '',
                    language: '',
                    snippet: ''
                }
            ]
        }
    ]
};