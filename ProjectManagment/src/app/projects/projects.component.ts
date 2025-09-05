import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/projects/project.service';
import { Project } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  createProject() {
    this.router.navigate([`create_projects/${1}`]);
  }

}
