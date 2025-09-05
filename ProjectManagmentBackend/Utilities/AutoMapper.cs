using AutoMapper;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Models;

namespace ProjectManagmentBackend.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // PROJECTS
            CreateMap<Project, ProjectDto>().ReverseMap();
            CreateMap<Project, CreateProjectDto>().ReverseMap();
            CreateMap<ProjectWithTaskDto, Project>().ForMember(dest => dest.Tasksses, config => config.MapFrom(src => src.Tasks)).ReverseMap();

            // TASKS
            CreateMap<Tasks, TaskDto>().ReverseMap();
            CreateMap<Tasks, CreateTaskDto>().ReverseMap();
            CreateMap<TaskWithSubTasksDto, Tasks>().ForMember(dest => dest.SubsTasks, config => config.MapFrom(src => src.SubTasks)).ReverseMap();

            // SUBTASKS
            CreateMap<SubsTask, SubTaskDto>().ReverseMap();
            CreateMap<SubsTask, CreateSubTaskDto>().ReverseMap();

        }
    }
}