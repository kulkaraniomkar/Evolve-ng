import { Component, Input, OnChanges } from '@angular/core'

@Component({
  selector: 'emui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  @Input() src: string
  @Input() size: string
  @Input() bordered: boolean
  @Input() borderColor = '#d2d9e5'
  sizeClass: string
  borderedClass: string

  ngOnChanges() {
    this.sizeClass = 'size' + this.size
    this.borderedClass = 'bordered'
  }
  imgErr(event){
   // console.log('Testing image ', event);
    event.target.src = 'assets/images/avatars/no-profile-image.png';
  }
}
