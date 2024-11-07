import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  standalone: true,
  styleUrls: ['./create-task.component.css'],
  providers: [TaskService],
  imports: [FormsModule]
})
export class CreateTaskComponent {
  newTask = {
    itemId: 0,
    taskName: '',
    taskDescription: '',
    dueDate: new Date().toISOString(),
    createdOn: new Date().toISOString(),
    isCompleted: false,
    tags: '',
    completedOn: new Date().toISOString(),
    color: this.getRandomColor() // Rastgele renk seçimi
  };

  @Output() closeModal = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  close() {
    this.closeModal.emit();
  }

  handleAddTask(): void {
    this.taskService.createTask(this.newTask).subscribe(
      response => {
        if (response.result) {
          this.taskAdded.emit(); // Başarılı görev ekleme bildirimi
          this.close(); // Modalı kapat
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Görev başarıyla eklendi",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert('Görev eklenirken bir hata oluştu!');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Görev ekleme hatası:', error);
        alert('Görev eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    );
  }

  getRandomColor(): string {
    const colors = ['#8470ff', '#0000ff', '#2e8b57', '#00ff00', '#800080', '#ff6a6a', '#ffa500', '#ff0000'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}