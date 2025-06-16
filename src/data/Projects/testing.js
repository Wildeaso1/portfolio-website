export const TestingProject = {
    id: 3,
    title: 'Testing Project',
    description: "This is a test project to check the loading of JSON files.",
    headerImage: '',
    images: [],
    tags: [ 'Game', '2D' , 'Photoshop' ],
    tools: [ 'C#', 'Photoshop' ],
    toolIcons: [ 'C#', 'Photoshop' ],
    subpages: [
        {
            id: 1,
            title: 'Combo System',
            description: 'Implemented a robust character controller with smooth animations.',
            images: [ '/images/features/feature1-main.jpg' ],
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