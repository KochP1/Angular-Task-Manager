using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectManagmentBackend.Data;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Models;

namespace ProjectManagmentBackend.Services
{
    public interface ISubTaskServices
    {
        Task<SubTaskDto> CreateTask(CreateSubTaskDto createSubTaskDto);
        Task<bool> DeleteTask(int id);
        Task<SubTaskDto> GetSubTaskById(int id);
        Task<SubTaskDto[]> GetSubTasks();
        Task<bool> UpdateTask(int id, CreateSubTaskDto updateSubTaskDto);
    }

    public class SubTaskServices : ISubTaskServices
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public SubTaskServices(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<SubTaskDto[]> GetSubTasks()
        {
            var subTasks = await context.SubsTasks.OrderBy(x => x.Description).ToListAsync();
            var subTaskDto = mapper.Map<SubTaskDto[]>(subTasks);
            return subTaskDto;
        }

        public async Task<SubTaskDto> GetSubTaskById(int id)
        {
            var subsTask = await context.SubsTasks.FirstOrDefaultAsync(x => x.Id == id);
            var subTaskDto = mapper.Map<SubTaskDto>(subsTask);
            return subTaskDto;
        }

        public async Task<SubTaskDto> CreateTask(CreateSubTaskDto createSubTaskDto)
        {
            var subsTask = mapper.Map<SubsTask>(createSubTaskDto);
            context.SubsTasks.Add(subsTask);
            await context.SaveChangesAsync();
            var subsTaskDto = mapper.Map<SubTaskDto>(subsTask);
            return subsTaskDto;
        }

        public async Task<bool> UpdateTask(int id, CreateSubTaskDto updateSubTaskDto)
        {
            var subTask = await context.SubsTasks.FirstOrDefaultAsync(x => x.Id == id);

            if (subTask is null)
            {
                return false;
            }

            subTask.Description = updateSubTaskDto.Description;
            subTask.IsCompleted = updateSubTaskDto.IsCompleted;
            subTask.IdTask = updateSubTaskDto.IdTask;
            context.SubsTasks.Update(subTask);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTask(int id)
        {
            var subTask = await context.SubsTasks.FirstOrDefaultAsync(x => x.Id == id);

            if (subTask is null)
            {
                return false;
            }

            context.SubsTasks.Remove(subTask);
            await context.SaveChangesAsync();
            return true;
        }
    }
}