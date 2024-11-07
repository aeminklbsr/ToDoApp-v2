import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class EditTaskComponent {
  @Input() task: Task | null = null; // Düzenlenecek görevi alır
  @Output() taskUpdated = new EventEmitter<void>(); // Güncelleme sonrası olay yayını
  @Output() taskDeleted = new EventEmitter<void>(); // Silme sonrası olay yayını
  @Output() taskCompleted = new EventEmitter<void>(); // Tamamlama sonrası olay yayını

  constructor(private taskService: TaskService) {}

  updateTask(): void {
    if (!this.task) return;
  
    this.taskService.updateTask(this.task).subscribe(
      response => {
        if (response.result) {
          this.taskUpdated.emit(); // Güncelleme sonrası diğer işlemler
          
          // SweetAlert ile başarı mesajı
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Not başarıyla güncellendi",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Hata",
            text: "Not güncellenirken bir sorun oluştu!",
            confirmButtonText: "Tamam"
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Not güncelleme hatası:', error);
        
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Not güncellenirken bir hata oluştu. Lütfen tekrar deneyin.",
          confirmButtonText: "Tamam"
        });
      }
    );
  }

  deleteTask(): void {
    if (!this.task) return;
  
    this.taskService.deleteTask(this.task.itemId).subscribe(
      response => {
        if (response.result) {
          this.taskDeleted.emit(); 
  
          Swal.fire({
            icon: "error",
            title: "Not Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Hata",
            text: "Görev silinirken bir sorun oluştu!",
            confirmButtonText: "Tamam"
          });
        }
      },
      (error) => {
        console.error('Görev silme hatası:', error);
  
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Görev silinirken bir hata oluştu. Lütfen tekrar deneyin.",
          confirmButtonText: "Tamam"
        });
      }
    );
  }

  // Yeni tamamla işlevi
  completeTask(): void {
    if (!this.task) return;

    const updatedTask = { ...this.task, isCompleted: true }; // Sadece `isCompleted` alanını güncelliyoruz

    this.taskService.updateTask(updatedTask).subscribe(
      response => {
        if (response.result) {
          this.taskCompleted.emit(); // Tamamlama sonrası olay yayını

          Swal.fire({
            icon: "success",
            title: "Görev başarıyla tamamlandı",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Hata",
            text: "Görev tamamlanırken bir sorun oluştu!",
            confirmButtonText: "Tamam"
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Görev tamamlama hatası:', error);
        
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Görev tamamlanırken bir hata oluştu. Lütfen tekrar deneyin.",
          confirmButtonText: "Tamam"
        });
      }
    );
  }
}