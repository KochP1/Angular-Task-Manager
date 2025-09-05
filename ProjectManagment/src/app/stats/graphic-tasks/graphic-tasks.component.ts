import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Percentage } from 'src/app/interfaces/interfaces';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-graphic-tasks',
  templateUrl: './graphic-tasks.component.html',
  styleUrls: ['./graphic-tasks.component.css']
})
export class GraphicTasksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  stats: Percentage;
  isLoading: boolean;
  errorMessage: string;
  private chart: any;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stats) {
        this.createChart();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadStats() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getPercentagesTasks().subscribe({
      next: (stats) => {
        this.stats = stats;
        console.log(this.stats.En_curso);
        this.isLoading = false;

        setTimeout(() => {
          if (this.chart) {
            this.updateChart();
          } else {
            this.createChart();
          }
        }, 100);
      },
      error: (error) => {
        this.errorMessage = "Error al obtener los datos";
        this.isLoading = false;
        console.error(this.errorMessage + error);
      }
    })
  }

  private createChart(): void {
    setTimeout(() => {
      if (!this.chartCanvas?.nativeElement || !this.stats) return;

      const ctx = this.chartCanvas.nativeElement;

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'pie', 
        data: {
          labels: ['Finalizada', 'En curso', 'Pendiente'],
          datasets: [{
            data: [this.stats.Finalizada, this.stats.En_curso, this.stats.Pendiente],
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }, 200);
  }

  private updateChart(): void {
    if (!this.chart || !this.stats) return;

    this.chart.data.datasets[0].data = [
      this.stats.Finalizada,
      this.stats.En_curso,
      this.stats.Pendiente
    ];
    
    this.chart.update();
  }

}
