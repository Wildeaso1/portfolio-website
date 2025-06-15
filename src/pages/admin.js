import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ProjectAdmin = () =>
{
    const router = useRouter();
    const [ projects, setProjects ] = useState([]);
    const [ currentProject, setCurrentProject ] = useState({
        id: Date.now(),
        title: '',
        description: '',
        headerImage: '',
        images: [ '' ],
        tags: [],
        tools: [],
        toolIcons: [],
        codeSnippet: null,
        codeLanguage: '',
        subpages: [],
    });
    const [ currentSubpage, setCurrentSubpage ] = useState({
        id: Date.now(),
        title: '',
        description: '',
        images: [ '' ],
        codeSnippets: [],
    });
    const [ currentCodeSnippet, setCurrentCodeSnippet ] = useState({
        snippet: '',
        language: '',
        title: '',
        description: '',
    });
    const [ showSubpageForm, setShowSubpageForm ] = useState(false);
    const [ showCodeSnippetForm, setShowCodeSnippetForm ] = useState(false);
    const [ newTag, setNewTag ] = useState('');
    const [ newTool, setNewTool ] = useState('');
    const [ message, setMessage ] = useState('');

    // Load projects on component mount
    useEffect(() =>
    {
        const savedProjects = localStorage.getItem('projectsData');
        if (savedProjects)
        {
            setProjects(JSON.parse(savedProjects));
        }
    }, []);

    // Save projects to localStorage whenever they change
    useEffect(() =>
    {
        if (projects.length > 0)
        {
            localStorage.setItem('projectsData', JSON.stringify(projects));
        }
    }, [ projects ]);

    const handleProjectChange = (e) =>
    {
        const { name, value } = e.target;
        setCurrentProject({ ...currentProject, [ name ]: value });
    };

    const handleSubpageChange = (e) =>
    {
        const { name, value } = e.target;
        setCurrentSubpage({ ...currentSubpage, [ name ]: value });
    };

    const handleCodeSnippetChange = (e) =>
    {
        const { name, value } = e.target;
        setCurrentCodeSnippet({ ...currentCodeSnippet, [ name ]: value });
    };

    const addTag = () =>
    {
        if (newTag.trim() !== '' && !currentProject.tags.includes(newTag.trim()))
        {
            setCurrentProject({
                ...currentProject,
                tags: [ ...currentProject.tags, newTag.trim() ],
            });
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) =>
    {
        setCurrentProject({
            ...currentProject,
            tags: currentProject.tags.filter((tag) => tag !== tagToRemove),
        });
    };

    const addTool = () =>
    {
        if (newTool.trim() !== '' && !currentProject.tools.includes(newTool.trim()))
        {
            setCurrentProject({
                ...currentProject,
                tools: [ ...currentProject.tools, newTool.trim() ],
                toolIcons: [ ...currentProject.toolIcons, newTool.trim() ],
            });
            setNewTool('');
        }
    };

    const removeTool = (toolToRemove) =>
    {
        setCurrentProject({
            ...currentProject,
            tools: currentProject.tools.filter((tool) => tool !== toolToRemove),
            toolIcons: currentProject.toolIcons.filter((tool) => tool !== toolToRemove),
        });
    };

    const addImage = () =>
    {
        setCurrentProject({
            ...currentProject,
            images: [ ...currentProject.images, '' ],
        });
    };

    const updateImage = (index, value) =>
    {
        const updatedImages = [ ...currentProject.images ];
        updatedImages[ index ] = value;
        setCurrentProject({
            ...currentProject,
            images: updatedImages,
        });
    };

    const removeImage = (index) =>
    {
        setCurrentProject({
            ...currentProject,
            images: currentProject.images.filter((_, i) => i !== index),
        });
    };

    const addSubpageImage = () =>
    {
        setCurrentSubpage({
            ...currentSubpage,
            images: [ ...currentSubpage.images, '' ],
        });
    };

    const updateSubpageImage = (index, value) =>
    {
        const updatedImages = [ ...currentSubpage.images ];
        updatedImages[ index ] = value;
        setCurrentSubpage({
            ...currentSubpage,
            images: updatedImages,
        });
    };

    const removeSubpageImage = (index) =>
    {
        setCurrentSubpage({
            ...currentSubpage,
            images: currentSubpage.images.filter((_, i) => i !== index),
        });
    };

    const addCodeSnippet = () =>
    {
        if (currentCodeSnippet.snippet.trim() !== '' && currentCodeSnippet.title.trim() !== '')
        {
            setCurrentSubpage({
                ...currentSubpage,
                codeSnippets: [ ...currentSubpage.codeSnippets, { ...currentCodeSnippet } ],
            });
            setCurrentCodeSnippet({
                snippet: '',
                language: '',
                title: '',
                description: '',
            });
            setShowCodeSnippetForm(false);
        }
    };

    const removeCodeSnippet = (index) =>
    {
        setCurrentSubpage({
            ...currentSubpage,
            codeSnippets: currentSubpage.codeSnippets.filter((_, i) => i !== index),
        });
    };

    const addSubpage = () =>
    {
        if (currentSubpage.title.trim() !== '')
        {
            setCurrentProject({
                ...currentProject,
                subpages: [ ...currentProject.subpages, { ...currentSubpage } ],
            });
            setCurrentSubpage({
                id: Date.now(),
                title: '',
                description: '',
                images: [ '' ],
                codeSnippets: [],
            });
            setShowSubpageForm(false);
        }
    };

    const removeSubpage = (index) =>
    {
        setCurrentProject({
            ...currentProject,
            subpages: currentProject.subpages.filter((_, i) => i !== index),
        });
    };

    const saveProject = () =>
    {
        if (currentProject.title.trim() === '')
        {
            setMessage('Project title is required');
            return;
        }

        const projectExists = projects.find(project => project.id === currentProject.id);
        let updatedProjects;

        if (projectExists)
        {
            updatedProjects = projects.map(project =>
                project.id === currentProject.id ? currentProject : project
            );
            setMessage('Project updated successfully!');
        } else
        {
            updatedProjects = [ ...projects, { ...currentProject, id: Date.now() } ];
            setMessage('Project added successfully!');
        }

        setProjects(updatedProjects);

        // Reset form
        setCurrentProject({
            id: Date.now(),
            title: '',
            description: '',
            headerImage: '',
            images: [ '' ],
            tags: [],
            tools: [],
            toolIcons: [],
            codeSnippet: null,
            codeLanguage: '',
            subpages: [],
        });

        // Clear message after 3 seconds
        setTimeout(() =>
        {
            setMessage('');
        }, 3000);
    };

    const editProject = (project) =>
    {
        setCurrentProject({ ...project });
    };

    const deleteProject = (projectId) =>
    {
        if (window.confirm("Are you sure you want to delete this project?"))
        {
            setProjects(projects.filter(project => project.id !== projectId));
            setMessage('Project deleted successfully!');

            // Clear message after 3 seconds
            setTimeout(() =>
            {
                setMessage('');
            }, 3000);
        }
    };

    const exportProjects = () =>
    {
        const dataStr = `export const projectsData = ${ JSON.stringify(projects, null, 2) };

const getUniqueTags = (projects) => {
  const allTags = projects.flatMap((project) => project.tags);
  const uniqueTagsSet = new Set(allTags);
  return ['all', ...uniqueTagsSet];
};

const uniqueTags = getUniqueTags(projectsData);

export { uniqueTags };`;

        const blob = new Blob([ dataStr ], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "projectsData.js";
        link.href = url;
        link.click();
    };

    const viewProjectsPage = () =>
    {
        router.push('/projects');
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Projects Admin</h1>

            { message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    { message }
                </div>
            ) }

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <div className="bg-white rounded shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Add/Edit Project</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={ currentProject.title }
                                onChange={ handleProjectChange }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Project Title"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={ currentProject.description }
                                onChange={ handleProjectChange }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Project Description"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Header Image</label>
                            <input
                                type="text"
                                name="headerImage"
                                value={ currentProject.headerImage }
                                onChange={ handleProjectChange }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="/images/your-image.png"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Images
                                <button
                                    type="button"
                                    onClick={ addImage }
                                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    + Add
                                </button>
                            </label>
                            { currentProject.images.map((image, index) => (
                                <div key={ index } className="flex mb-2">
                                    <input
                                        type="text"
                                        value={ image }
                                        onChange={ (e) => updateImage(index, e.target.value) }
                                        className="flex-grow px-3 py-2 border rounded"
                                        placeholder="/images/your-image.png"
                                    />
                                    <button
                                        type="button"
                                        onClick={ () => removeImage(index) }
                                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            )) }
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Tags
                                <div className="flex mt-1">
                                    <input
                                        type="text"
                                        value={ newTag }
                                        onChange={ (e) => setNewTag(e.target.value) }
                                        className="flex-grow px-3 py-2 border rounded"
                                        placeholder="Add a tag"
                                    />
                                    <button
                                        type="button"
                                        onClick={ addTag }
                                        className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                { currentProject.tags.map((tag, index) => (
                                    <span
                                        key={ index }
                                        className="bg-gray-200 px-2 py-1 rounded flex items-center"
                                    >
                                        { tag }
                                        <button
                                            type="button"
                                            onClick={ () => removeTag(tag) }
                                            className="ml-1 text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )) }
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Tools
                                <div className="flex mt-1">
                                    <input
                                        type="text"
                                        value={ newTool }
                                        onChange={ (e) => setNewTool(e.target.value) }
                                        className="flex-grow px-3 py-2 border rounded"
                                        placeholder="Add a tool"
                                    />
                                    <button
                                        type="button"
                                        onClick={ addTool }
                                        className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                { currentProject.tools.map((tool, index) => (
                                    <span
                                        key={ index }
                                        className="bg-gray-200 px-2 py-1 rounded flex items-center"
                                    >
                                        { tool }
                                        <button
                                            type="button"
                                            onClick={ () => removeTool(tool) }
                                            className="ml-1 text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )) }
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Subpages
                                <button
                                    type="button"
                                    onClick={ () => setShowSubpageForm(true) }
                                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    + Add Subpage
                                </button>
                            </h3>

                            { currentProject.subpages.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    { currentProject.subpages.map((subpage, index) => (
                                        <div key={ index } className="border p-2 rounded">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{ subpage.title }</h4>
                                                <button
                                                    type="button"
                                                    onClick={ () => removeSubpage(index) }
                                                    className="text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-600">{ subpage.description.substring(0, 100) }...</p>
                                            <p className="text-sm text-gray-600">
                                                { subpage.images.length } images, { subpage.codeSnippets.length } code snippets
                                            </p>
                                        </div>
                                    )) }
                                </div>
                            ) }
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={ saveProject }
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Project
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    { showSubpageForm && (
                        <div className="bg-white rounded shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Add Subpage
                                <button
                                    type="button"
                                    onClick={ () => setShowSubpageForm(false) }
                                    className="ml-2 text-red-500 text-sm"
                                >
                                    Cancel
                                </button>
                            </h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ currentSubpage.title }
                                    onChange={ handleSubpageChange }
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Subpage Title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={ currentSubpage.description }
                                    onChange={ handleSubpageChange }
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Subpage Description"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Images
                                    <button
                                        type="button"
                                        onClick={ addSubpageImage }
                                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        + Add
                                    </button>
                                </label>
                                { currentSubpage.images.map((image, index) => (
                                    <div key={ index } className="flex mb-2">
                                        <input
                                            type="text"
                                            value={ image }
                                            onChange={ (e) => updateSubpageImage(index, e.target.value) }
                                            className="flex-grow px-3 py-2 border rounded"
                                            placeholder="/images/your-image.png"
                                        />
                                        <button
                                            type="button"
                                            onClick={ () => removeSubpageImage(index) }
                                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            X
                                        </button>
                                    </div>
                                )) }
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Code Snippets
                                    <button
                                        type="button"
                                        onClick={ () => setShowCodeSnippetForm(true) }
                                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        + Add Code
                                    </button>
                                </h3>

                                { currentSubpage.codeSnippets.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        { currentSubpage.codeSnippets.map((snippet, index) => (
                                            <div key={ index } className="border p-2 rounded">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium">{ snippet.title }</h4>
                                                    <button
                                                        type="button"
                                                        onClick={ () => removeCodeSnippet(index) }
                                                        className="text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600">Language: { snippet.language }</p>
                                                <p className="text-sm text-gray-600">
                                                    { snippet.snippet.substring(0, 50) }...
                                                </p>
                                            </div>
                                        )) }
                                    </div>
                                ) }
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={ addSubpage }
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Add Subpage
                                </button>
                            </div>
                        </div>
                    ) }

                    { showCodeSnippetForm && (
                        <div className="bg-white rounded shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Add Code Snippet
                                <button
                                    type="button"
                                    onClick={ () => setShowCodeSnippetForm(false) }
                                    className="ml-2 text-red-500 text-sm"
                                >
                                    Cancel
                                </button>
                            </h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ currentCodeSnippet.title }
                                    onChange={ handleCodeSnippetChange }
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Code Snippet Title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Language</label>
                                <input
                                    type="text"
                                    name="language"
                                    value={ currentCodeSnippet.language }
                                    onChange={ handleCodeSnippetChange }
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="javascript, python, csharp, etc."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Description (optional)</label>
                                <textarea
                                    name="description"
                                    value={ currentCodeSnippet.description }
                                    onChange={ handleCodeSnippetChange }
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Code Description"
                                    rows="2"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Code</label>
                                <textarea
                                    name="snippet"
                                    value={ currentCodeSnippet.snippet }
                                    onChange={ handleCodeSnippetChange }
                                    className="w-full px-3 py-2 border rounded font-mono"
                                    placeholder="Paste your code here"
                                    rows="10"
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={ addCodeSnippet }
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Add Code Snippet
                                </button>
                            </div>
                        </div>
                    ) }

                    { !showSubpageForm && !showCodeSnippetForm && (
                        <div className="bg-white rounded shadow-md p-6 mb-6">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-xl font-semibold">Project List</h2>
                                <div>
                                    <button
                                        type="button"
                                        onClick={ exportProjects }
                                        className="bg-purple-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Export JS
                                    </button>
                                    <button
                                        type="button"
                                        onClick={ viewProjectsPage }
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        View Projects
                                    </button>
                                </div>
                            </div>

                            { projects.length === 0 ? (
                                <p className="text-gray-500">No projects added yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    { projects.map((project) => (
                                        <div
                                            key={ project.id }
                                            className="border rounded p-3 hover:bg-gray-50"
                                        >
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">{ project.title }</h3>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={ () => editProject(project) }
                                                        className="text-blue-500 mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={ () => deleteProject(project.id) }
                                                        className="text-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                { project.description.substring(0, 100) }
                                                { project.description.length > 100 && '...' }
                                            </p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                { project.tags.map((tag, index) => (
                                                    <span
                                                        key={ index }
                                                        className="bg-gray-200 px-2 py-0.5 rounded text-xs"
                                                    >
                                                        { tag }
                                                    </span>
                                                )) }
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            ) }
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default ProjectAdmin;