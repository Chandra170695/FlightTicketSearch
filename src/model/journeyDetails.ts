import {FlightModelReturn} from './flightModelReturn';

export class JourneyDetails {
    public flightExists: boolean;
    public startDate:string;
    public origin:string;
    public destination:string;
    public type:string;
    public returnstartDate:string;
    public displaylist: FlightModelReturn[];
  
   }