namespace ProjectManagmentBackend.DTOS
{
    public class TaskDto
    {
            public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Status { get; set; } = null!;

        public DateOnly DueDate { get; set; }

        public int? IdProject { get; set; }
    }
}