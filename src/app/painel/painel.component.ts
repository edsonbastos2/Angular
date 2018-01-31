import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Frase} from '../shared/frase.model'
import {FRASE} from './frase.mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  public instrucao: string = 'Traduza a frase:'
  public frase: Frase[] = FRASE
  public resposta: string = ''
  public rodada: number  = 0
  public progresso: number = 0
  public tentativas: number = 3
  public rodadaFrase: Frase

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  
  }


  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtbr == this.resposta){
      // Troca  a pergunta rodada
      this.rodada++
      
      //Atualizar a barra progresso
      this.progresso = this.progresso + (100 / this.frase.length)

        if(this.rodada === 4) {
         this.encerrarJogo.emit('Vitoria')
        }

      //atualiza o objeto da rodadaFrase
      this.atualizaRodada()

    }else{
      //diminuir a variavel tentativas
      this.tentativas--
      if(this.tentativas === -1){
        this.encerrarJogo.emit('Derrota')
      }
    }
  }

  public atualizaRodada(): void{
    //atualiza o objeto da rodadaFrase
    this.rodadaFrase = this.frase[this.rodada]
     // Linpar a resposta
     this.resposta = ''
  }

}


