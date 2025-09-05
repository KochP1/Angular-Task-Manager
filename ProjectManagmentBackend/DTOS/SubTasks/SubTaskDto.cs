namespace ProjectManagmentBackend.DTOS
{
    public class SubTaskDto
    {
        public int Id { get; set; }

        public string Description { get; set; } = null!;

        public bool IsCompleted { get; set; }

        public int IdTask { get; set; }
    }
}