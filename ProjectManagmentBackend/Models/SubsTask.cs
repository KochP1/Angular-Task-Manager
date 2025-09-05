using System;
using System.Collections.Generic;

namespace ProjectManagmentBackend.Models;

public partial class SubsTask
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public bool IsCompleted { get; set; }

    public int IdTask { get; set; }

    public virtual Tasks IdTaskNavigation { get; set; } = null!;
}
