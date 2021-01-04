import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgModel, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {


  constructor() { }
  onContentChanged(event)
  {
    this.contect.emit(event.html);
  }
  EditorForm:FormGroup;
  @Output() contect=new EventEmitter();
  editorStyle = {
    height: '200px',
    width:'60%'
  };
  modules= {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],              
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],     
      [{ 'indent': '-1' }, { 'indent': '+1' }],        
      [{ 'direction': 'rtl' }],                         

      [{ 'size': ['small', false, 'large', 'huge'] }],  
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],         
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                    
      ['link', 'image', 'video']   
    ],
  
  }
  ngOnInit(): void {
    this.EditorForm=new FormGroup({
      'editor':new FormControl(null)
    });
  }

}
