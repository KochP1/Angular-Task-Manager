using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectManagmentBackend.Data;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Models;

namespace ProjectManagmentBackend.Services
{
    public interface ITasksServices
    {
        Task<TaskDto> CreateTask(CreateTaskDto createTaskDto);
        Task<bool> DeleteTask(int id);
        Task<TaskDto> GetTaskById(int id);
        Task<TaskDto> GetTaskByTitle(string title);
        Task<TaskDto[]> GetTasks();
        Task<bool> UpdateTask(int id, CreateTaskDto updateTaskDto);
        Task<TaskWithSubTasksDto> GetTaskWithSubTask(int id);
        Task<int> GetCompletedTasksCount();
        Task<int> GetOnCourseTasksCount();
        Task<int> GetPendingTasksCount();
        Task<int> GetTasksCount();
        Task<Dictionary<string, decimal>> GetTasksCompletionPercentage();
        Task<TaskDto[]> GetTaskWithNoProject();

    }

    public class TasksServices : ITasksServices
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public TasksServices(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<TaskDto[]> GetTasks()
        {
            var tasks = await context.Tasks.OrderBy(x => x.Title).ToListAsync();
            var taskDto = mapper.Map<TaskDto[]>(tasks);
            return taskDto;
        }

        public async Task<TaskDto[]> GetTaskWithNoProject()
        {
            var tasks = await context.Tasks.Where(x => x.IdProject == null).OrderBy(x => x.Title).ToListAsync();
            var taskDto = mapper.Map<TaskDto[]>(tasks);
            return taskDto;
        }

        public async Task<int> GetCompletedTasksCount()
        {
            var query = context.Tasks.Where(t => t.Status == "Finalizada");

            return await query.CountAsync();
        }

        public async Task<int> GetOnCourseTasksCount()
        {
            var query = context.Tasks.Where(t => t.Status == "En curso");

            return await query.CountAsync();
        }

        public async Task<int> GetPendingTasksCount()
        {
            var query = context.Tasks.Where(t => t.Status == "Pendiente");

            return await query.CountAsync();
        }

        public async Task<int> GetTasksCount()
        {
            var query = context.Tasks;

            return await query.CountAsync();
        }

        public async Task<Dictionary<string, decimal>> GetTasksCompletionPercentage()
        {
            var totalTasks = await context.Tasks.CountAsync();
            if (totalTasks == 0)
            {
                return new Dictionary<string, decimal>
                {
                    { "Finalizada", 0m },
                    { "En curso", 0m },
                    { "Pendiente", 0m }
                };
            }

            var completedTasks = await context.Tasks
                .Where(t => t.Status == "Finalizada")
                .CountAsync();

            var onCourseTasks = await context.Tasks
                .Where(t => t.Status == "En curso")
                .CountAsync();

            var pendingTasks = await context.Tasks
                .Where(t => t.Status == "Pendiente")
                .CountAsync();

            return new Dictionary<string, decimal>
            {
                { "Finalizada", Math.Round((decimal)completedTasks / totalTasks * 100, 2) },
                { "En_curso", Math.Round((decimal)onCourseTasks / totalTasks * 100, 2) },
                { "Pendiente", Math.Round((decimal)pendingTasks / totalTasks * 100, 2) }
            };
        }

        public async Task<TaskDto> GetTaskById(int id)
        {
            var tasks = await context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            var taskDto = mapper.Map<TaskDto>(tasks);
            return taskDto;
        }

        public async Task<TaskWithSubTasksDto> GetTaskWithSubTask(int id)
        {
            var tasks = await context.Tasks.OrderBy(x => x.Title).Include(x => x.SubsTasks).FirstOrDefaultAsync(x => x.Id == id);
            var tasksDto = mapper.Map<TaskWithSubTasksDto>(tasks);
            return tasksDto;
        }

        public async Task<TaskDto> GetTaskByTitle(string title)
        {
            var tasks = await context.Tasks.FirstOrDefaultAsync(x => x.Title == title);
            var taskDto = mapper.Map<TaskDto>(tasks);
            return taskDto;
        }

        public async Task<TaskDto> CreateTask(CreateTaskDto createTaskDto)
        {
            var task = mapper.Map<Tasks>(createTaskDto);
            context.Tasks.Add(task);
            await context.SaveChangesAsync();
            var taskDto = mapper.Map<TaskDto>(task);
            return taskDto;
        }

        public async Task<bool> UpdateTask(int id, CreateTaskDto updateTaskDto)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task is null)
            {
                return false;
            }

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.Status = updateTaskDto.Status;
            task.DueDate = updateTaskDto.DueDate;
            task.IdProject = updateTaskDto.IdProject;
            context.Tasks.Update(task);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTask(int id)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task is null)
            {
                return false;
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            return true;
        }
    }
}