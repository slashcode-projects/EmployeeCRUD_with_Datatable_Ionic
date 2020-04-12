import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  emp: Employee;
  constructor(private empService: EmployeeService,
              private toastController: ToastController,
              private activateRoute: ActivatedRoute,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.emp = new Employee();
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log('Employee Id ' + id );
    if ( id !== null ) {
      console.log('Id is not Null Setting details for Employee');
      this.empService.getEmployeeById(id).subscribe((emp: HttpResponse<Employee>) => {
        this.emp = emp.body;
        console.log(this.emp);
      });
    }
  }
  save() {
    console.log('Employee Id coming from form' + this.emp.empId);
    if (this.emp.empId === undefined) {
    console.log('inside save method');
    this.empService.addEmployee(this.emp).subscribe(async (emp: HttpResponse<Employee>) => {
      let toast = await this.toastController.create({
        message: 'Details Added for ' + this.emp.empName,
        duration: 3000
      });
      return await toast.present().then(() => {
        this.navCtrl.navigateRoot('home');
      });
    });
  } else {
    console.log('inside update method');
    this.empService.updateEmployee(this.emp).subscribe(async (emp: HttpResponse<Employee>) => {
      let toast = await this.toastController.create({
        message: 'Details Updated for ' + this.emp.empName,
        duration: 3000
      });
      return await toast.present().then(() => {
        this.navCtrl.navigateRoot('home');
      });
    });
  }
}

}
