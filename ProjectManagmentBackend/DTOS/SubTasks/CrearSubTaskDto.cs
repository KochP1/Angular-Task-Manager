namespace ProjectManagmentBackend.DTOS
{
    public class CreateSubTaskDto
    {
        public string Description { get; set; } = null!;

        public bool IsCompleted { get; set; }

        public int IdTask { get; set; }
    }
}