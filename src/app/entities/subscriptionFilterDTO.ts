export class SubscriptionFilterDTO {

  minPrice : number = 0
  maxPrice : number = 10000
  days : number[] = []
  startTime : string = '07:00:00'
  endTime : string = '22:00:00'
}
