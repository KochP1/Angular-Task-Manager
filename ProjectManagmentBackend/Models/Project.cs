using System;
using System.Collections.Generic;

namespace ProjectManagmentBackend.Models;

public partial class Project
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Tasks> Tasksses { get; set; } = new List<Tasks>();
}
