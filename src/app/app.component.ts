import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatApiService } from './chat-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private service: ChatApiService) {}

  ngOnInit() {}

  title = 'chat-ui';
  message?: any;
  changeCopy:string='Copy';

   @ViewChild('textInput', { static: false }) textInput!: ElementRef<HTMLInputElement>;

   inputText:String='';
   displayText:String='';
   isLoading: boolean = false;
   editedResponse: string = ''; // To store the edited response
   isEditing: boolean = false;
   /**
    * 
    * @param event 
    * @description whenever we are triggering button or clicking, by default button behaviour is reload page
    * to avoid that we are passing event object and calling preventDefault() method
    */

  sendMessage(event: any) {
    this.changeCopy='Copy';
    this.isLoading=true;
      this.displayText=this.inputText;
       this.inputText = '';
       event.preventDefault();
       this.service.getMessage(this.textInput.nativeElement.value).subscribe({
        next:(response:any) => {
          this.isLoading=false;
          var obj = JSON.parse(response);
          this.message = obj.choices[0].message.content;
        },
        error:(error) =>console.error(error),
        complete:() => console.log("successfully completed")
       });
  }
  copyResponse() {
    this.changeCopy='Copied';
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = this.message;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  startEditing() {
    this.editedResponse = this.message; // Set the initial value for editing
    this.isEditing = true; // Enable editing mode
  }
  
  saveChanges() {
    this.message = this.editedResponse; // Update the original response
    this.isEditing = false; // Disable editing mode
  }
  
  cancelEditing() {
    this.isEditing = false; // Disable editing mode
  }
  clearMessage(){
    this.inputText='';
  }
}
