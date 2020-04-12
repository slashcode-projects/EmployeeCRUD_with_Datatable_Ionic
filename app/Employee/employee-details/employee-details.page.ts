import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {
  emplList: Employee[];
  tablestyle = 'bootstrap';
  constructor(private empService: EmployeeService,
              private toastController: ToastController,
              private alertCntrl: AlertController,
              private navCtrl: NavController) { }

  ngOnInit(): void {
    this.loadAll();
  }
loadAll() {
  this.empService.getAllEmployee().subscribe( async (emplList: HttpResponse<Employee[]>) => {
    this.emplList = emplList.body;
    console.log(this.emplList);
    let toast = await this.toastController.create({
      message: 'Employee Details Loaded Successfully',
      duration: 3000
    });
    return await toast.present();
  });
}
doRefresh(event) {
  console.log('Begin async operation');
  this.loadAll();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}
async deleteEmployee(id: string) {
  console.log('Employee Id to Delete ' + id);
  const confirm = this.alertCntrl.create({
    message: 'Do You agree to Delete',
    buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Pressed Disagree');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.empService.deleteEmployee(id).subscribe(async () => {
              let toast = await this.toastController.create({
                message: 'Details Deleted for ' + id,
                duration: 3000
              });
              toast.present();
              this.navCtrl.navigateRoot('/home');
            });
          }
        }
    ]
  });
  (await confirm).present();
}
changeStyle() {
  if (this.tablestyle === 'dark') {
    this.tablestyle = 'bootstrap';
  } else {
    this.tablestyle = 'dark';
  }
}
}
