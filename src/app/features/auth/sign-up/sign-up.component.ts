import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
