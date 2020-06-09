import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/demos/reactiveForms/cadastro/generic-form-validation';

// Importa o serviço
import { TasksService } from '../../todo.service';

// Importa a store
import { Store } from '../../todo.store';

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html'
})

export class CreateTaskComponent implements OnInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    cadastroForm: FormGroup;
    tarefa: String;

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};


    constructor(private taskService: TasksService, private store: Store, private fb: FormBuilder) {

        this.validationMessages = {
            tarefa: {
                required: 'A Tarefa é requerido',
                minlength: 'A Tarefa precisa ter no mínimo 2 caracteres',
                maxlength: 'A Tarefa precisa ter no máximo 50 caracteres'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit() {

        this.cadastroForm = this.fb.group({
            tarefa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
        });
    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
        });
    }

    adicionarTask() {
        if (this.cadastroForm.dirty && this.cadastroForm.valid) {
            this.taskService.adicionar(this.cadastroForm.value.tarefa);           
            this.cadastroForm.reset();
        }    
    }

}





