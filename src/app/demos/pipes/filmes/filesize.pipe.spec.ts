import { FileSizePipe } from "./filesize.pipe";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Descrever
describe('FileSizePipe', () => {

    // Testando um método em um pipe
    // Teste de Unidade
    describe('Teste Isolado', () => {

        const pipe = new FileSizePipe();

        // Teste MB
        it('Deve converter bytes para MB', () => {
            // Esperar que X seja Y
            expect(pipe.transform(123456789)).toBe('117.74 MB');
            expect(pipe.transform(987654321)).toBe('941.90 MB');
        });

        // Teste GB
        it('Deve converter bytes para GB', () => {
            // Esperar que X seja Y
            expect(pipe.transform(1342177280)).toBe('1.25 GB');
        });

    });

    // Testando o pipe em si
    describe('Teste comportamental do Pipe', () => {

        // Criar um 'template' em string
        @Component({
            template: `
                Size: {{ size | filesize }}
            `
        })

        // Criar um componente para ser usado em tempo de execução
        class TestComponent {
            size = 123456789;
        }

        // Criar Component, Fixture (contexto do teste) e
        // Elemento (para ler o que foi escrito no teste)
        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;
        let el: HTMLElement;

        // Antes de cada teste, criar o escopo
        beforeEach(() => {
            // Se eu tenho um componente, tenho que ter um módulo
            TestBed.configureTestingModule({
                declarations: [
                    FileSizePipe,
                    TestComponent
                ]
            });

            // instanciando com um componente através 
            // do módulo criado em tempo de execução
            fixture = TestBed.createComponent(TestComponent);

            // Setar a instancia do componente de dentro da fixture
            component = fixture.componentInstance;

            // A lista de elementos que existem no HTML
            el = fixture.nativeElement;
        });


        // Teste MB
        it('Deve converter bytes para MB', () => {
            // Detectar mudanças no contexto simulado
            fixture.detectChanges();

            // Esperar que o conteúdo do HTML contenha X
            expect(el.textContent).toContain('Size: 117.74 MB');

            // Alterar o valor
            component.size = 1029281;

            // Detectar mudanças no contexto simulado
            fixture.detectChanges();

            // Esperar que o conteúdo do HTML contenha X
            expect(el.textContent).toContain('Size: 0.98 MB');
        });

        // Teste GB
        it('Deve converter bytes para GB', () => {         
            // Alterar o valor
            component.size = 1342177280;

            // Detectar mudanças no contexto simulado
            fixture.detectChanges();

            // Esperar que o conteúdo do HTML contenha X
            expect(el.textContent).toContain('Size: 1.25 GB');
        });
    });
});