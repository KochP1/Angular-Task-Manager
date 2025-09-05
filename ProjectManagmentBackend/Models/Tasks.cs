using System;
using System.Collections.Generic;

namespace ProjectManagmentBackend.Models;

public partial class Tasks
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly DueDate { get; set; }

    public int? IdProject { get; set; }

    public virtual Project? IdProjectNavigation { get; set; }

    public virtual ICollection<SubsTask> SubsTasks { get; set; } = new List<SubsTask>();
}
