export class TrainerClassFilterDTO {
  minPrice : number = 0.0
  maxPrice : number = 10000.0
  chosenWeekdays : string[] = []
  startTime : string = '07:00'
  endTime : string = '22:00'
}
