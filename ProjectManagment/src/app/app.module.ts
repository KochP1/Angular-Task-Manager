import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectService } from './services/projects/project.service';
import { TaskService } from './services/tasks/task.service';
import { SubTaskService } from './services/subTasks/sub-task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { ActualizarTaskComponent } from './tasks/actualizar-task/actualizar-task.component';
import { SubTaskFormComponent } from './subTasks/sub-task-form/sub-task-form.component';
import { StatsComponent } from './stats/stats.component';
import { TaskCountComponent } from './stats/task-count/task-count.component';
import { GraphicTasksComponent } from './stats/graphic-tasks/graphic-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    TasksComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailsComponent,
    ActualizarTaskComponent,
    SubTaskFormComponent,
    StatsComponent,
    TaskCountComponent,
    GraphicTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProjectService,
    TaskService,
    SubTaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
