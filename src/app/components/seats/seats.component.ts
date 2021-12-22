import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  constructor(private userService:UserService) { }
  public seatConfig: any = null;
  public seatmap = Array<any>();
  public seatChartConfig = {
    showRowsLabel : true,
    showRowWisePricing : true,
    newSeatNoForRow : true
  }
  public cart = {
    selectedSeats : Array<any>(),
    seatstoStore : Array<any>(),
    totalamount : 0,
    cartId : "",
    eventId : 0
  };
  title = 'seat-chart-generator';
  filterType = ['All','Audio','Video'];
  ngOnInit(): void {
    this.getSeatsData();
     //Process a simple bus layout

     

    
  }
  async getSeatsData (){
    this.userService.getSeatsDataInfo(1).subscribe(res=>{
      console.log(res)
      this.seatConfig = res.data;
      this.processSeatChart(this.seatConfig);
   })
  }
  onLoadFilter(filterId:any){
    this.userService.getSeatsDataInfo(filterId).subscribe(res=>{
      console.log(res)
      this.seatConfig = res.data;
      this.processSeatChart(this.seatConfig,'filter');
   })
  }
  public processSeatChart ( map_data : any[],type='' )
  {
      console.log(map_data,"map")
      if(type=="filter"){
             
        this.seatmap = [];
      }
      if( map_data.length > 0 )
      {
        var seatNoCounter = 1;
        for (let __counter = 0; __counter < map_data.length; __counter++) {
          var row_label = "";
          var item_map = map_data[__counter].seat_data;
          //console.log(JSON.parse(item_map));
          var item_map  = JSON.parse(item_map).seat_map;
          //Get the label name and price
          row_label = "Row "+item_map[0].seat_label + " - ";
          if( item_map[ item_map.length - 1].seat_label != " " )
          {
            row_label += item_map[ item_map.length - 1].seat_label;
          }
          else
          {
            row_label += item_map[ item_map.length - 2].seat_label;
          }
          row_label += " : Rs. " + map_data[__counter].seat_price;
          
          item_map.forEach((map_element:any) => {
            var mapObj = {
              "seatRowLabel" : map_element.seat_label,
              "seats" :Array<any>(),
              "seatPricingInformation" : row_label
            };
            row_label = "";
            var seatValArr:any = map_element.layout.split('');
            if( this.seatChartConfig.newSeatNoForRow )
            {
              seatNoCounter = 1; //Reset the seat label counter for new row
            }
            var totalItemCounter = 1;
            let arr = Array<any>();
            seatValArr.forEach((item:any) => {
              var seatObj = {
                "key" : map_element.seat_label+"_"+totalItemCounter,
                "price" : map_data[__counter]["seat_price"],
                "status" : "available",
                "seatLabel" : "",
                "seatNo" : "",
                "seats": ""
              };
               
              if( item != '_')
              {
                seatObj["seatLabel"] = map_element.seat_label+" "+seatNoCounter;
                if(seatNoCounter < 10)
                { seatObj["seatNo"] = "0"+seatNoCounter; }
                else { seatObj["seatNo"] = ""+seatNoCounter; }
                
                seatNoCounter++;
              }
              else
              {
                seatObj["seatLabel"] = "";
              }
              totalItemCounter++;
              mapObj["seats"].push(seatObj);
              
            });
            console.log(" \n\n\n Seat Objects " , mapObj);
            // if(type=="filter"){
             
            //   this.seatmap = [];
            //   this.seatmap.push( mapObj );
            //   console.log("fileter",this.seatmap)
            // }else{
              this.seatmap.push( mapObj );
              console.log("normal",this.seatmap)
            // }
            

          });
        }
      }
    }

    public selectSeat( seatObject : any )
    {
      console.log( "Seat to block: " , seatObject );
      if(seatObject.status == "available")
      {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
      }
      else if( seatObject.status = "booked" )
      {
        seatObject.status = "available";
        var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
        if( seatIndex > -1)
        {
          this.cart.selectedSeats.splice(seatIndex , 1);
          this.cart.seatstoStore.splice(seatIndex , 1);
          this.cart.totalamount -= seatObject.price;
        }
        
      }
    }

    // public blockSeats(seatsToBlock : string)
    // {
    //   if(seatsToBlock != "")
    //   {
    //     var seatsToBlockArr = seatsToBlock.split(',');
    //     for (let index = 0; index < seatsToBlockArr.length; index++) {
    //       var seat =  seatsToBlockArr[index]+"";
    //       var seatSplitArr = seat.split("_");
    //       console.log("Split seat: " , seatSplitArr);
    //       for (let index2 = 0; index2 < this.seatmap.length; index2++) {
    //         const element : any = this.seatmap[index2];
    //         if(element.seatRowLabel == seatSplitArr[0])
    //         {
    //           var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
    //           if(seatObj)
    //           {
    //             console.log("\n\n\nFount Seat to block: " , seatObj);
    //             seatObj["status"] = "unavailable";
    //             this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
    //             console.log("\n\n\nSeat Obj" , seatObj);
    //             console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
    //             break;
    //           }
               
    //         }
    //       }
         
    //     }
    //   }
      
    // }

}
