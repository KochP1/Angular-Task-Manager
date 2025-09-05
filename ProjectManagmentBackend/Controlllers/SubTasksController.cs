using Microsoft.AspNetCore.Mvc;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Services;

namespace ProjectManagmentBackend.Controllers
{
    [ApiController]
    [Route("api/subTasks")]

    public class SubTasksController : ControllerBase
    {
        private readonly ISubTaskServices subTaskServices;

        public SubTasksController(ISubTaskServices subTaskServices)
        {
            this.subTaskServices = subTaskServices;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var tasks = await subTaskServices.GetSubTasks();
                return Ok(tasks);
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
                var task = await subTaskServices.GetSubTaskById(id);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(CreateSubTaskDto createSubTaskDto)
        {
            try
            {
                var task = await subTaskServices.CreateTask(createSubTaskDto);
                return StatusCode(201, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, CreateSubTaskDto updateSubTaskDto)
        {
            try
            {
                var result = await subTaskServices.UpdateTask(id, updateSubTaskDto);

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
                var result = await subTaskServices.DeleteTask(id);

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