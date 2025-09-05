namespace ProjectManagmentBackend.DTOS
{
    public class ProjectWithTaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;
        public List<TaskDto> Tasks { get; set; } = [];
    }
}