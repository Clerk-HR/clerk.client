import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Member, Role } from '../../../../Core/User/member';
@Component({
  selector: 'app-manage-employees',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.css'
})
export class ManageEmployeesComponent {


  selectedEmployee?: Member;

  employees: Member[] = [
    {
      id: "A1B2C3D4E5",
      user: {
        id: "U1",
        email: "alice.wonderland@example.com",
        avatarUrl: "assets/img/employees3.webp",
        fullname: "Alice Wonderland",
        phoneNumber: "+1234567890",
        createdOn: 1610000000000
      },
      roles: [Role.manager
      ],
      JoinedOn: 1615000000000
    },
    {
      id: "F6G7H8I9J0",
      user: {
        id: "U2",
        email: "bob.builder@example.com",
        avatarUrl: "assets/img/employee4.webp",
        fullname: "Bob Builder",
        phoneNumber: "+1987654321",
        createdOn: 1611000000000
      },
      roles: [Role.employee],
      JoinedOn: 1616000000000
    },
    {
      id: "K1L2M3N4O5",
      user: {
        id: "U3",
        email: "charlie.chocolate@example.com",
        avatarUrl: "assets/img/employee5.jpeg",
        fullname: "Charlie Chocolate",
        phoneNumber: "+1098765432",
        createdOn: 1612000000000
      },
      roles: [Role.manager
      ],
      JoinedOn: 1617000000000
    },
    {
      id: "P6Q7R8S9T0",
      user: {
        id: "U4",
        email: "david.dancer@example.com",
        avatarUrl: "assets/img/employee6.webp",
        fullname: "David Dancer",
        phoneNumber: "+1209876543",
        createdOn: 1613000000000
      },
      roles: [Role.employee],
      JoinedOn: 1618000000000
    },
    {
      id: "U1V2W3X4Y5",
      user: {
        id: "U5",
        email: "emma.elephant@example.com",
        avatarUrl: "assets/img/employee9.jpeg",
        fullname: "Emma Elephant",
        phoneNumber: "+1309876543",
        createdOn: 1614000000000
      },
      roles: [Role.manager
      ],
      JoinedOn: 1619000000000
    },
    {
      id: "Z6A7B8C9D0",
      user: {
        id: "U6",
        email: "frank.frog@example.com",
        avatarUrl: "assets/img/employee1.jpg",
        fullname: "Frank Frog",
        phoneNumber: "+1409876543",
        createdOn: 1615000000000
      },
      roles: [Role.employee],
      JoinedOn: 1620000000000
    },
    {
      id: "E1F2G3H4I5",
      user: {
        id: "U7",
        email: "grace.giraffe@example.com",
        avatarUrl: "assets/img/employee11.webp",
        fullname: "Grace Giraffe",
        phoneNumber: "+1509876543",
        createdOn: 1616000000000
      },
      roles: [Role.manager
      ],
      JoinedOn: 1621000000000
    },
  ]

  getSeverity(role: Role): string {
    switch (role) {
      case Role.employee:
        return 'success'

      case Role.manager:
        return 'info'

      default:
        return 'warning'
    }
  }

}
