import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { CommondataService } from './../commondata.service';
import {JourneyDetails} from './../../model/journeyDetails';
import {FlightModelReturn} from './../../model/flightModelReturn';

@Component({
  selector: 'app-display-search',
  templateUrl: './display-search.component.html',
  styleUrls: ['./display-search.component.css']
})
export class DisplaySearchComponent implements OnInit {

  constructor(private obj:HttpClient ,private serobj:CommondataService) { }
  flightList:FlightModelReturn[]=[];
  journey:JourneyDetails;
  ngOnInit(): void {
   
    this.journey  = new JourneyDetails();
    ;
    this.journey.origin="Start City";
    this.journey.destination = "End City";
    this.journey.type = "One Way"
    this.serobj.sharedMessage.subscribe(response => {
      if("origin" in response )
      {
        this.journey = response 
      }
    });
  }

}
