using Microsoft.AspNetCore.Mvc;
using ProjectManagmentBackend.DTOS;
using ProjectManagmentBackend.Services;

namespace ProjectManagmentBackend.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsServices projectsServices;

        public ProjectsController(IProjectsServices projectsServices)
        {
            this.projectsServices = projectsServices;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var projects = await projectsServices.GetProjects();
                return Ok(projects);
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
                var projects = await projectsServices.GetProjectById(id);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("collection/{id:int}")]
        public async Task<ActionResult> GetWithTasksById(int id)
        {
            try
            {
                var projects = await projectsServices.GetProjectsWithTasks(id);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpGet("{name:alpha}")]
        public async Task<ActionResult> GetByName(string name)
        {
            try
            {
                var projects = await projectsServices.GetProjectByName(name);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(CreateProjectDto createProjectDto)
        {
            try
            {
                var projects = await projectsServices.CreateProject(createProjectDto);
                return StatusCode(201, projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, CreateProjectDto updateProjectDto)
        {
            try
            {
                var result = await projectsServices.UpdateProject(id, updateProjectDto);

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
                var result = await projectsServices.DeleteProject(id);

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