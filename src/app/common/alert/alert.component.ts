/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

}
