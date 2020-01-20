import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DashboardClient,DashboardCriteria } from '../clients';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective, {static: false}) chart: BaseChartDirective;
  
  public categoryChartLabel: Label[] = [];
  public categoryChartData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public countryQtyChartLabel: Label[] = ['Uk', 'Brazil', 'France'];
  public countryAmountChartLabel: Label[] = ['Uk', 'Brazil', 'France'];

  public categoryQtyChartLabel: Label[] = ['Dairy Products', 'Seafood', 'Confections'];
  public categoryAmountChartLabel: Label[] = ['Dairy Products', 'Seafood', 'Confections'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public countryQtyChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Quantity' },
  ];
  public countryAmountChartData: ChartDataSets[] = [
    { data: [40, 25, 80], label: 'Amount' }
  ];

  public categoryQtyChartData: ChartDataSets[] = [
    { data: [56, 55, 135], label: 'Quantity' },
  ];
  public categoryAmountChartData: ChartDataSets[] = [
    { data: [50, 27, 90], label: 'Amount' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#5DB4EE' }
  ]
  searchForm: FormGroup;
  isDisabledOrderDateTo: Boolean = true;
  minOrderDateTo: any = null;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  showChart:Boolean = true;
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date();
  constructor(
    private dashboardClient: DashboardClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    //this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.firstDay, this.lastDay];
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      orderDateFrom: [null],
      orderDateTo: [null],
      dateRange: [this.bsRangeValue]
    });
    this.dateRangeChange();
  }

  onOrderDateFromChange(value: Date) {
    if(value != null) {
      this.isDisabledOrderDateTo = false;
    } else {
      this.isDisabledOrderDateTo = true;
    }
    this.minOrderDateTo = value;

    if(value != null) {
      this.searchForm.controls['orderDateTo'].setValidators([Validators.required])
    } else {
      this.searchForm.controls['orderDateTo'].setValidators(null)
    }
    this.searchForm.controls['orderDateTo'].updateValueAndValidity();


    if(this.searchForm.value.orderDateTo == null || this.searchForm.value.orderDateTo == '') {
        this.searchForm.patchValue({
          orderDateTo: value
        })
    }
  }
  onOrderDateToChange(value: Date) {
    if(this.isDisabledOrderDateTo) {
      // this.searchForm.patchValue({
      //   orderDateTo: ''
      // })
    }

    if(value != null) {
      this.searchForm.controls['orderDateFrom'].setValidators([Validators.required])
    } else {
      this.searchForm.controls['orderDateFrom'].setValidators(null)
    }
    this.searchForm.controls['orderDateFrom'].updateValueAndValidity()
  }

  searchSubmit(dateFrom, dateTo) {
    let searchData:DashboardCriteria = {};
    searchData.dateFrom = dateFrom;
    searchData.dateTo = dateTo;
    
    this.dashboardClient.getOrderInfosByDate(searchData)
          .subscribe((res) => {
            if(res != null) {

              /* country */
              let qty  = res.orderInfoCountries.map(function(data,i){
                return +(data.quantity);
              });
              this.countryQtyChartData = [];
              let chartData : any= {};
              chartData.data = qty;
              chartData.label = "Quantity"
              this.countryQtyChartData.push(chartData);

              let amount = res.orderInfoCountries.map(function(data,i){
                return +(data.orderDetailAmount.toFixed(2))
              });
              this.countryAmountChartData = [];
              chartData = {};
              chartData.data = amount;
              chartData.label = "Amount"
              this.countryAmountChartData.push(chartData);

              this.countryQtyChartLabel = res.orderInfoCountries.map(function(data,i){
                return (data.shipCountry)
              });
              this.countryAmountChartLabel = this.countryQtyChartLabel;

              /* category*/
              qty  = res.orderInfoCategories.map(function(data,i){
                return +(data.quantity);
              });
              this.categoryQtyChartData = [];
              chartData = {};
              chartData.data = qty;
              chartData.label = "Quantity"
              this.categoryQtyChartData.push(chartData);

              amount = res.orderInfoCategories.map(function(data,i){
                return +(data.orderDetailAmount.toFixed(2))
              });
              this.categoryAmountChartData = [];
              chartData = {};
              chartData.data = amount;
              chartData.label = "Amount"
              this.categoryAmountChartData.push(chartData);

              this.categoryQtyChartLabel = res.orderInfoCategories.map(function(data,i){
                return (data.categoryName)
              });
              this.categoryAmountChartLabel = this.categoryQtyChartLabel;

            } else {
              this.toastr.error('Something went wrong!', 'Error!');      
            }
        },(err) => {
          this.toastr.error('Something went wrong!', 'Error!');
        });
  }

  dateRangeChange() {
    let searchData:any = {};
    let rangeData = this.searchForm.value.dateRange;
    if(rangeData && rangeData.length > 0){
      searchData.orderDateFrom =  new Date((<Date>rangeData[0]).setHours(0, 0, 0, 0));
      searchData.orderDateTo =  new Date((<Date>rangeData[1]).setHours(0, 0, 0, 0));
    }
    this.searchSubmit(searchData.orderDateFrom, searchData.orderDateTo);
  }

  thisMonth() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.searchSubmit(firstDay, lastDay);
  }

  lastMonth() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    this.searchSubmit(firstDay, lastDay);
  }

  thisQuater() {
    let now = new Date();
    let quarter = Math.floor((now.getMonth() / 3));
    let firstDay = new Date(now.getFullYear(), quarter * 3, 1);
    let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 3, 0);
    this.searchSubmit(firstDay, lastDay);
  }
  
  lastQuater() {
    let now = new Date();
    let quarter = Math.floor((now.getMonth() / 3));
    quarter = (quarter-1);
    let firstDay = new Date(now.getFullYear(), quarter * 3, 1);
    let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 3, 0);
    this.searchSubmit(firstDay, lastDay);
  }

  thisYear() {
    let firstDay = new Date(new Date().getFullYear(), 0, 1);
    let lastDay = new Date(new Date().getFullYear()+1, 0, 0);
    this.searchSubmit(firstDay, lastDay);
  }

  
}
