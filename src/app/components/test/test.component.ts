import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// interface OrderItem {
//   orderitemcode: string;
//   orderitemname: string;
//   orderqty: number;
// }

interface GroupedData {
  basketon: string;
  items: OrderItem[];
}

interface OrderItem {
  orderitemcode: string;
  orderitemname: string;
  orderqty: number;
  basketon: string;
}
@Component({
  selector: 'app-test',
  standalone: false,
  
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  rawData: OrderItem[] = [
    { orderitemcode: '1180400', orderitemname: 'LED A1 postion 402', orderqty: 100, basketon: '1' },
    { orderitemcode: '1ALP0.5-PO', orderitemname: 'ALPRAZolam TABLET 0.5 MG', orderqty: 100, basketon: '1' },
    { orderitemcode: '1090420^30', orderitemname: 'SEmed แพ็ค 30 2 BOX', orderqty: 2, basketon: '2' },
    { orderitemcode: '1070560^30', orderitemname: 'SEmed แพ็ค 30 2 BOX', orderqty: 2, basketon: '3' }
  ];

  groupedData: { basketon: string, dataSource: MatTableDataSource<OrderItem> }[] = [];
  displayedColumns: string[] = ['orderitemcode', 'orderitemname', 'orderqty'];

  constructor() {
    this.groupData();
  }
  groupData() {
    const grouped: Record<string, OrderItem[]> = {};

    this.rawData.forEach(item => {
      if (!grouped[item.basketon]) {
        grouped[item.basketon] = [];
      }
      grouped[item.basketon].push(item);
    });

    this.groupedData = Object.keys(grouped).map(basket => ({
      basketon: basket,
      dataSource: new MatTableDataSource(grouped[basket])
    }));
  }
}

