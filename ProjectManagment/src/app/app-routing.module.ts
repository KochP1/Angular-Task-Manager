import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { ActualizarTaskComponent } from './tasks/actualizar-task/actualizar-task.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { SubTaskFormComponent } from './subTasks/sub-task-form/sub-task-form.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {path: "", component: DashboardComponent, children: [
    {path: "projects", component: ProjectsComponent},
    {path: "create_projects/:action", component: ProjectFormComponent},
    {path: "update_projects/:id/:action", component: ProjectFormComponent},
    {path: "detail_projects/:id", component: ProjectDetailsComponent},
    {path: "tasks", component: TasksComponent},
    {path: "create_tasks/:action", component: TaskFormComponent},
    {path: "create_tasks_project/:id/:action", component: TaskFormComponent},
    {path: "detail_tasks/:id", component: TaskDetailsComponent},
    {path: "update_task/:id", component: ActualizarTaskComponent},
    {path: "update_subTask/:id/:action", component: SubTaskFormComponent},
    {path: "create_Subtasks/:id/:action", component: SubTaskFormComponent},
    {path: "stats", component: StatsComponent},
  ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
