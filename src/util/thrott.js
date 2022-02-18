// export default function thrott(callback, t) {
//   let timer = null;
//   return function () {
//     // 参数
//     const arg = arguments;
//     if (!timer) {
//       timer = setTimeout(() => {
//         callback(...arg);
//         //
//         timer = null;
//       }, t);
//     } else {
//       return false;
//     }
//     return true;
//   };
// }
