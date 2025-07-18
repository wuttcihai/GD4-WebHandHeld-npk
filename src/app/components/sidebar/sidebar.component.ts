import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  sidebar_group: string;
  sidebar_name: string;
  sidebar_link: string;
  sidebar_icon: string;
  sidebar_isdropdown: string;
  sidebar_icondropdown?: string;
  pharmacycode?: string;
  isEnabled?: string;
}

interface GroupedSidebar {
  [key: string]: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}
  user: any = null;
  formattedSidebar: any = [];
  users = JSON.parse(localStorage.getItem('user') || '{}');

  
  sidebarSetting: SidebarItem[] = this.users[0]?.authorized || [];
  activeIndex: number | null = null;

  groupedSidebar: GroupedSidebar = {}; 
  dropdownShown: { [key: string]: boolean } = {};
  ngOnInit() {
    // console.log(this.sidebarSetting.filter(item =>{item.isEnabled == "Y"}))
    // console.log(this.sidebarSetting.filter(item => item.isEnabled === "Y" && item.pharmacycode == localStorage.getItem("pharmacycode")));



    this.groupedSidebar = this.sidebarSetting.filter(item => item.isEnabled === "Y" && item.pharmacycode == localStorage.getItem("pharmacycode")).reduce((acc, item) => {
      if (!acc[item.sidebar_group]) {
        acc[item.sidebar_group] = [];
      }
      acc[item.sidebar_group].push(item);
      return acc;
    }, {} as GroupedSidebar);

    this.formattedSidebar = Object.keys(this.groupedSidebar).map((group) => ({
      groupName: group,
      isdropdown: this.groupedSidebar[group][0].sidebar_isdropdown,
      icondropdown: this.groupedSidebar[group][0].sidebar_icondropdown,
      items: this.groupedSidebar[group],
    }));

    // console.log(this.users)
  }

  handleItemClick(index: number): void {
    console.log('Item clicked:', index);
  }

  // handleNavigation(event: Event, index: number) {
  //   // event.preventDefault(); // ป้องกันการนำทางโดยตรงจาก href
  //   this.activeIndex = index;

  //   // นำทางไปยัง main ก่อน
  //   this.router.navigate(['main']).then(() => {
  //     // รอให้ Angular Routing เสร็จสิ้นก่อน จากนั้นเปลี่ยนไปยัง URL ที่ต้องการ
  //     setTimeout(() => {
  //       window.location.href = "http://kcmh-pharma.chula.or.th/dashboard/#/";
  //     }, 1500); // ให้เวลา Angular Routing ทำงานก่อน
  //   });
  // }
}
