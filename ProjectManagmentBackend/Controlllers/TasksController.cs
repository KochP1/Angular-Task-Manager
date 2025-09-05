using Microsoft.AspNetCore.Mvc;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Services;

namespace ProjectManagmentBackend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksServices tasksServices;

        public TasksController(ITasksServices tasksServices)
        {
            this.tasksServices = tasksServices;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var tasks = await tasksServices.GetTasks();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("no_project")]
        public async Task<ActionResult> GetWithNoProject()
        {
            try
            {
                var tasks = await tasksServices.GetTaskWithNoProject();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("completed_tasks")]
        public async Task<ActionResult> GetCompletedTask()
        {
            try
            {
                var count = await tasksServices.GetCompletedTasksCount();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("pending_tasks")]
        public async Task<ActionResult> GetPendingTask()
        {
            try
            {
                var count = await tasksServices.GetPendingTasksCount();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("onCourse_tasks")]
        public async Task<ActionResult> GetOnCourseTask()
        {
            try
            {
                var count = await tasksServices.GetOnCourseTasksCount();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("percentage")]
        public async Task<ActionResult> GetPercentageStatus()
        {
            try
            {
                var result = await tasksServices.GetTasksCompletionPercentage();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var task = await tasksServices.GetTaskById(id);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("collection/{id:int}")]
        public async Task<ActionResult> GetWithSubTasksById(int id)
        {
            try
            {
                var task = await tasksServices.GetTaskWithSubTask(id);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("{title:alpha}")]
        public async Task<ActionResult> GetByName(string title)
        {
            try
            {
                var task = await tasksServices.GetTaskByTitle(title);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(CreateTaskDto createTaskDto)
        {
            try
            {
                var task = await tasksServices.CreateTask(createTaskDto);
                return StatusCode(201, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, CreateTaskDto updateTaskDto)
        {
            try
            {
                var result = await tasksServices.UpdateTask(id, updateTaskDto);

                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var result = await tasksServices.DeleteTask(id);

                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }
    }
}