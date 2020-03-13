import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subText = ''; // The text that should appear in the sub-display
  mainText = ''; // The text that should appear in the main display
  operand1: number; // The first operand
  operand2: number; // The second operand
  operator = ''; // The operator
  calculationString = ''; // This is the string that denotes the operation being performed
  answered = false; // A flag to check whether the solution has been processed
  operatorSet = false; // You'll see how this is used soon

  pressKey(key: string) {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
       const lastKey = this.mainText[this.mainText.length - 1];
       if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+')  {
         this.operatorSet = true;
       }
       if ((this.operatorSet) || (this.mainText === '')) {
         return;
       }
       this.operand1 = parseFloat(this.mainText);
       this.operator = key;
       this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
 }

 getAnswer() {
  this.calculationString = this.mainText;
  this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
  if (this.operator === '/') {
    this.subText = this.mainText;
    this.mainText = (this.operand1 / this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) {
      this.mainText = this.mainText.substr(0, 9);
    }
  } else if (this.operator === 'x') {
    this.subText = this.mainText;
    this.mainText = (this.operand1 * this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) {
      this.mainText = 'ERROR';
      this.subText = 'Range Exceeded';
    }
  } else if (this.operator === '-') {
    this.subText = this.mainText;
    this.mainText = (this.operand1 - this.operand2).toString();
    this.subText = this.calculationString;
  } else if (this.operator === '+') {
    this.subText = this.mainText;
    this.mainText = (this.operand1 + this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) {
      this.mainText = 'ERROR';
      this.subText = 'Range Exceeded';
    }
  } else {
    this.subText = 'ERROR: Invalid Operation';
  }
  this.answered = true;
}

allClear() {
  this.answered = false;
  this.subText = '';
  this.mainText = '';
  this.operatorSet = false;
}

}
