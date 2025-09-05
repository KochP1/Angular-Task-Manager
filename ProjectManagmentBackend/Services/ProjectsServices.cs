using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectManagmentBackend.Data;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Models;

namespace ProjectManagmentBackend.Services
{
    public interface IProjectsServices
    {
        Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto);
        Task<bool> DeleteProject(int id);
        Task<ProjectDto> GetProjectById(int id);
        Task<ProjectDto> GetProjectByName(string name);
        Task<ProjectDto[]> GetProjects();
        Task<bool> UpdateProject(int id, CreateProjectDto updateProject);
        Task<ProjectWithTaskDto> GetProjectsWithTasks(int id);
        Task<int> GetProjectCountById(int id);
    }

    public class ProjectsServices : IProjectsServices
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ProjectsServices(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ProjectDto[]> GetProjects()
        {
            var projects = await context.Projects.OrderBy(x => x.Name).ToListAsync();
            var projectsDto = mapper.Map<ProjectDto[]>(projects);
            return projectsDto;
        }

        public async Task<int> GetProjectCountById(int id)
        {
            var project = await context.Tasks.CountAsync(x => x.Id == id);
            return project;
        }

        public async Task<ProjectDto> GetProjectById(int id)
        {
            var projects = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);
            var projectsDto = mapper.Map<ProjectDto>(projects);
            return projectsDto;
        }

        public async Task<ProjectWithTaskDto> GetProjectsWithTasks(int id)
        {
            var project = await context.Projects.Include(x => x.Tasksses).FirstOrDefaultAsync(x => x.Id == id);
            var projectDto = mapper.Map<ProjectWithTaskDto>(project);
            return projectDto;
        }

        public async Task<ProjectDto> GetProjectByName(string name)
        {
            var projects = await context.Projects.FirstOrDefaultAsync(x => x.Name == name);
            var projectsDto = mapper.Map<ProjectDto>(projects);
            return projectsDto;
        }

        public async Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto)
        {
            var project = mapper.Map<Project>(createProjectDto);
            context.Projects.Add(project);
            await context.SaveChangesAsync();
            var projectDto = mapper.Map<ProjectDto>(project);
            return projectDto;
        }

        public async Task<bool> UpdateProject(int id, CreateProjectDto updateProject)
        {
            var project = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);

            if (project is null)
            {
                return false;
            }

            project.Name = updateProject.Name;
            project.Description = updateProject.Description;
            context.Projects.Update(project);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProject(int id)
        {
            var project = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);

            if (project is null)
            {
                return false;
            }

            context.Projects.Remove(project);
            await context.SaveChangesAsync();
            return true;
        }
    }
}