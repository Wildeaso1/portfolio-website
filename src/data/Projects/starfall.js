export const projectProjectStarfall = {
    id: 1,
    title: 'Project Starfall',
    description: "Project-Starfall is a 2.5D Metroidvania couch co-op game created by a group of students, it's a game with forces and physics as its core mechanic.",
    headerImage: '/images/projectSF-head.png',
    images: ['/images/projectSF-head.png', '/images/projectSF-menu.png', '/images/projectSF-level.png'],
    tags: ['Game', 'unity', '3D'],
    tools: ['Unity', 'C#', 'Blender', 'Github'],
    toolIcons: ['Unity', 'C#', 'Blender', 'Github'],
    subpages: [
        {
            id: 1,
            title: 'Combo System',
            description: 'Implemented a robust character controller with smooth animations.',
            images: ['/images/features/feature1-main.jpg'],
            codeSnippets: [
                {
                    title: 'Basic Character Controller',
                    description: 'This script handles the basic movement and input for the character.',
                    language: 'csharp',
                    snippet: `// Example C# code for character controller...`
                }
            ]
        }
    ]
};