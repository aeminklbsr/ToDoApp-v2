import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, CreateTaskComponent, EditTaskComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TaskService]
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  private lastColor: string | null = null;
  isAddTaskModalOpen = false;
  editableTask: Task | null = null;
  isEditTaskModalOpen = false;

  constructor(private taskService: TaskService) {}

  openAddTaskModal(): void {
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal(): void {
    this.isAddTaskModalOpen = false;
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      if (response.result) {
        this.tasks = response.data.map(task => ({
          ...task,
          color: this.getColorForTask(task.itemId)
        }));
      }
    });
  }

  openEditTaskModal(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    this.editableTask = { ...task };
    this.isEditTaskModalOpen = true;
  }

  closeEditTaskModal(): void {
    this.isEditTaskModalOpen = false;
    this.editableTask = null;
  }

  

  getRandomColor(): string {
    const colors = ['#8470ff', '#0000ff', '#2e8b57', '#00ff00', '#800080', '#ff6a6a', '#ffa500', '#ff0000'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getColorForTask(itemId: number): string {
    const storedColor = localStorage.getItem(`task-color-${itemId}`);
    if (storedColor) {
      return storedColor;
    } else {
      const color = this.getRandomColor();
      localStorage.setItem(`task-color-${itemId}`, color);
      return color;
    }
  }

  handleTaskCompleted(): void {
    if (!this.editableTask) return;

    const index = this.tasks.findIndex(task => task.itemId === this.editableTask!.itemId);
    if (index !== -1) {
      this.tasks[index].isCompleted = true;
    }
    this.closeEditTaskModal(); 
  }
}