import { TaskService } from './../shared/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './../shared/task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'Nova Tarefa';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const task = this.taskService.getById(parseInt(id));
      if (task !== undefined) {
        this.task = task;
        this.title = 'Alterando tarefa';
      } else {
        console.log('A tarefa não existe.');
      }
    }
  }

  onSubmit() {
    this.taskService.save(this.task);
    this.router.navigate(['']);
  }



}
