/** Angular */
import { Injectable } from '@angular/core';

/** Angular material */
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsServiceService {


  constructor(private cMatSnackBar: MatSnackBar) { }

  /** Exibição de mensagens de sucesso */
  public pop(_Type: string, _Message: string, _Time: number) {
    let vClass: string = '';

    switch (_Type) {
      case 'success':
        vClass = 'alert-sucess';
        break;

      case 'warning':
        vClass = 'alert-warning';
        break

      case 'error':
        vClass = 'alert-error';
        break;
    };

    this.cMatSnackBar.open(_Message, 'x', {
      duration: _Time,
      panelClass: vClass,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  };
}
