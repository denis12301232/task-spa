export default class Validate {
   static required(value: string) {
      return !!value;
   }

   static maxLength(max: number) {
      return function (value: string) {
         return value.length < max;
      }
   }
}