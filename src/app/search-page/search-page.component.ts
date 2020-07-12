import { Component, OnInit } from '@angular/core';
import { CommondataService } from './../commondata.service';
import{ HttpClient } from '@angular/common/http';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {FlightModel} from './../../model/flightModel';
import {FlightModelReturn} from './../../model/flightModelReturn';
import {JourneyDetails} from './../../model/journeyDetails';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private serviceobj:CommondataService ,private httpobj:HttpClient) { }
  
  ngOnInit(): void {

    this.cityList=this.serviceobj.serviceCity;
    this.httpobj.get('./assets/flight.json').subscribe(response =>{ this.flightlist = response as FlightModel[]});
    this.httpobj.get('./assets/flightReturn.json').subscribe(response =>{ this.flightlistreturn = response as FlightModelReturn[]});
  
  }
;
  cityList:string[]=[];
  startDate=new NgbDate(2020, 10, 10);
  returnstartDate=new NgbDate(2020, 10, 13);
  origin:string = "";
  destination:string = "";
  passengers:number = 1;
  amount:number[] =[0,10000]; 
  errorExists:boolean = false;
  sameCityErrorExists:boolean = false;
  dateError:boolean = false;
  startDateInString:string;
  returnstartDateInString:string;
  displayList:any[]=[];
  flightlist:FlightModel[]=[];
  selectedFlightList:FlightModel[]=[];
  flightlistreturn:FlightModelReturn[]=[];
  type="One Way";

  changeType(value){
    this.type =value;
  }

  search(){
    this.startDateInString = this.startDate.day + "/" + this.startDate.month + "/" + this.startDate.year;
    this.returnstartDateInString = this.returnstartDate.day + "/" + this.returnstartDate.month + "/" + this.returnstartDate.year;
    if(this.type == 'One Way')
    {
      this.selectedFlightList = this.flightlist;
    }
    else
    {
      this.selectedFlightList = this.flightlistreturn;
    }
    for(let i=0; i<this.selectedFlightList.length; i++ )
    {
      if(this.selectedFlightList[i].departureDate == this.startDateInString)
      {
        if(this.selectedFlightList[i].startPoint == this.origin)
          {
            if(this.selectedFlightList[i].endPoint == this.destination)
            {
              if(this.selectedFlightList[i].availableTickets>=this.passengers)
              {
                if(this.selectedFlightList[i].price >=this.amount[0] && this.selectedFlightList[i].price <=this.amount[1])
                {
                 if(this.selectedFlightList[i].returndepartureDate == this.returnstartDateInString && this.type == 'Return')
                  {
                    this.displayList.push(this.selectedFlightList[i]);   
                  }
                  else
                  {
                    this.displayList.push(this.selectedFlightList[i]); 
                  }
                }
              }       
            }
          }
       }
    }

    let journey = new JourneyDetails();
    if(this.displayList.length > 0){
      journey.flightExists = true;
    }
    else{
      journey.flightExists = false;
    }
    journey.startDate = this.startDateInString;
    journey.origin = this.origin;
    journey.destination = this.destination;
    journey.type = this.type;
    if(this.type == "Return"){
      journey.returnstartDate = this.returnstartDateInString;
    }
    journey.displaylist = this.displayList;
    this.serviceobj.nextMessage(journey);
    this.displayList =[];
    // this.startDate=new NgbDate(2020, 10, 10)
    // this.returnstartDate=new NgbDate(2020, 10, 13);
    // this.origin="";
    // this.destination="";
    // this.passengers= 1;

  }

  beforeSearchValidation(){
    if(this.origin != "" && this.destination != "" && (Object.keys(this.startDate).length != 0)&& this.type == "One Way"){
     this.errorExists = false;
      if( ! this.searchCityValidation()){
        this.search();
      }
     
    }
    else if(this.origin != "" && this.destination != "" && (Object.keys(this.startDate).length!=0)&&(Object.keys(this.returnstartDate).length!=0) &&this.type == "Return"){
     this.errorExists = false;
      if( ! this.searchCityValidation() && ! this.dateComparison()){
        this.search();
      }
    }
    else{
      this.errorExists = true;
    }
  }

  searchCityValidation(){
    if(this.origin == this.destination){
      this.sameCityErrorExists = true;
      return true;
    }else{
      this.sameCityErrorExists = false;
      return false;
    }
  }
  
  dateComparison(){
    var a = new Date(this.returnstartDate.year+"-"+this.returnstartDate.month+"-"+this.returnstartDate.day);
    var b = new Date(this.startDate.year+"-"+this.startDate.month+"-"+this.startDate.day);
   if(a.getTime() < b.getTime()){
     this.dateError = true;
      return true;
   }
   else
   {
    this.dateError = false;
    return false;
   
   }
  }

  incrementDecrementPassengers(type){
    if(type=="typeplus"){
      this.passengers = this.passengers + 1;
    }
    else if(type=="typeminus"){
      
      if(this.passengers > 1){
        this.passengers = this.passengers - 1;
      }
    }
  }

  changeAmount(){
    console.log("clicked");
  }
}